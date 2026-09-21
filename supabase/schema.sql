-- Grok Bot Hackathon San José — schema
-- Run this in the Supabase SQL editor after creating the project.

create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'received'
    check (status in ('received', 'reviewed')),
  team_name text not null,
  members jsonb not null,
  contact_email text not null,
  one_liner text not null,
  problem text not null,
  solution text not null,
  prototype_type text not null
    check (prototype_type in ('slides', 'figma', 'llm_demo', 'video', 'other')),
  prototype_url text,
  pitch_slides_url text,
  github_url text,
  video_url text,
  file_path text,
  notes text,
  clasypcs_confirmed boolean not null,
  constraint submissions_team_name_unique unique (team_name),
  constraint submissions_members_is_array check (jsonb_typeof(members) = 'array')
);

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);

alter table public.submissions enable row level security;

drop policy if exists "Public can insert submissions" on public.submissions;
create policy "Public can insert submissions"
  on public.submissions
  for insert
  to anon, authenticated
  with check (true);

-- No public SELECT/UPDATE/DELETE.
-- Admin reads and updates use SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'submissions',
  'submissions',
  false,
  20971520,
  array[
    'application/pdf',
    'image/png',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-zip'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Private bucket: no public storage policies.
-- Uploads and signed downloads go through the service role.

create table if not exists public.event_settings (
  id int primary key default 1 check (id = 1),
  submissions_open boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.event_settings enable row level security;

insert into public.event_settings (id, submissions_open)
values (1, true)
on conflict (id) do nothing;
