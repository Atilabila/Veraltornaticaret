-- MP-10: Admin Auth Flow + Audit + Guardrails (v2 - Production Ready)

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
comment on column public.admin_logs.payload is 'Action-specific metadata (e.g., {status: "shipped"})';
