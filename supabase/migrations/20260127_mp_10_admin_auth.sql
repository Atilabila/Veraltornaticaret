-- MP-10: Admin Authentication & Audit Logging

-- 1. Admin Logs (Audit Trail)
-- Stores all sensitive actions performed by admins
create table if not exists public.admin_logs (
  id bigint generated always as identity primary key,
  admin_user_id uuid, -- Optional if we use whitelist only, but good for Auth users
  admin_email text not null,
  action text not null,
  entity text not null,
  entity_id text,
  payload jsonb,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- RLS: Only accessible via service-role (Server Actions)
alter table public.admin_logs enable row level security;

create policy "Restrict access to admin_logs"
on public.admin_logs for all
to anon, authenticated
using (false)
with check (false);

-- 2. Admins Whitelist (Fallback/Strict Control)
-- Extra layer of security: user must be in this table to be considered admin
create table if not exists public.admins (
  id bigint generated always as identity primary key,
  email text unique not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- RLS: Only accessible via service-role
alter table public.admins enable row level security;

create policy "Restrict access to admins whitelist"
on public.admins for all
to anon, authenticated
using (false)
with check (false);

-- 3. Initial Admin Seed
-- Replace with your admin email
-- INSERT INTO public.admins (email) VALUES ('admin@veralteneketicaret.com');

COMMENT ON TABLE public.admin_logs IS 'MP-10: Audit trail for administrative actions';
COMMENT ON TABLE public.admins IS 'MP-10: Whitelist of authorized admin emails';
