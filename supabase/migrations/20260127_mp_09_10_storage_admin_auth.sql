-- MP-09/10 (Consolidated): Storage + Admin Auth/Audit tables
-- Note: This file exists to keep a single migration version for 20260127.

-- =====================================================
-- MP-09: Storage / Quote attachments
-- =====================================================

-- Create table for quote attachments
CREATE TABLE IF NOT EXISTS public.quote_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT one_attachment_per_quote UNIQUE(quote_id)
);

-- Enable RLS
ALTER TABLE public.quote_attachments ENABLE ROW LEVEL SECURITY;

-- Note: In Supabase, bucket creation from SQL requires the 'storage' schema.
-- This part ensures the bucket exists if run with sufficient privileges.
INSERT INTO storage.buckets (id, name, public)
SELECT 'quote-attachments', 'quote-attachments', false
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'quote-attachments'
);

-- Storage RLS Policies
-- 1. Unauthenticated Upload: Anyone can upload to their specific quote folder
CREATE POLICY "Unauthenticated Upload Policy" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'quote-attachments' AND
        (storage.foldername(name))[1] = 'quotes'
    );

-- 2. Admin Read: Only admins can read/download
CREATE POLICY "Admin Read Policy" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'quote-attachments' AND
        auth.role() = 'service_role'
    );

-- Table RLS Policies
CREATE POLICY "Public Insert" ON public.quote_attachments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Select" ON public.quote_attachments
    FOR SELECT USING (auth.role() = 'service_role');

-- =====================================================
-- MP-10: Admin Auth Flow + Audit + Guardrails (v2)
-- =====================================================

-- 1. Admin Logs Table
create table if not exists public.admin_logs (
  id bigint generated always as identity primary key,
  admin_user_id uuid not null,
  action text not null,
  entity text not null,
  entity_id text,
  payload jsonb,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Drop admin_email column if exists (normalize to admin_user_id only)
alter table public.admin_logs drop column if exists admin_email;

-- RLS: Strict lockdown (only service-role can access)
alter table public.admin_logs enable row level security;

drop policy if exists "no access for anon" on public.admin_logs;
create policy "no access for anon"
on public.admin_logs for all
to anon
using (false)
with check (false);

drop policy if exists "no access for authenticated" on public.admin_logs;
create policy "no access for authenticated"
on public.admin_logs for all
to authenticated
using (false)
with check (false);

-- 2. Admins Whitelist Table
create table if not exists public.admins (
  id bigint generated always as identity primary key,
  email text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS: Strict lockdown
alter table public.admins enable row level security;

drop policy if exists "no access for anon" on public.admins;
create policy "no access for anon"
on public.admins for all
to anon
using (false)
with check (false);

drop policy if exists "no access for authenticated" on public.admins;
create policy "no access for authenticated"
on public.admins for all
to authenticated
using (false)
with check (false);

-- 3. Comments
comment on table public.admin_logs is 'MP-10: Audit trail for all administrative actions';
comment on table public.admins is 'MP-10: Whitelist of authorized admin emails (fallback to app_metadata.role)';
comment on column public.admin_logs.admin_user_id is 'Supabase Auth user ID (normalized)';
comment on column public.admin_logs.payload is 'Action-specific metadata (e.g., {status: \"shipped\"})';

