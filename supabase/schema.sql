-- =========================================================================
-- Círculo de Entablado (CDE) — Supabase schema
-- Run this in your Supabase project's SQL editor to provision the database
-- used by the public site and the hidden Admin dashboard (Alt + C).
-- =========================================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------------------
-- Officers / Leadership Team
-- ---------------------------------------------------------------------
create table if not exists officers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  position text not null,
  photo_url text,
  description text,
  social_links jsonb,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Achievements & Awards
-- ---------------------------------------------------------------------
create table if not exists achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date_achieved date,
  image_url text,
  category text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Productions (past & upcoming)
-- ---------------------------------------------------------------------
create table if not exists productions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  poster_url text,
  production_date date,
  venue text,
  status text check (status in ('past', 'upcoming')) default 'upcoming',
  cast_info text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Events & Workshops
-- ---------------------------------------------------------------------
create table if not exists events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  event_date date,
  event_time text,
  location text,
  registration_link text,
  image_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Gallery
-- ---------------------------------------------------------------------
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  category text,
  date_uploaded date default now(),
  display_order integer default 0
);

-- ---------------------------------------------------------------------
-- Media (videos / press articles)
-- ---------------------------------------------------------------------
create table if not exists media (
  id uuid primary key default uuid_generate_v4(),
  media_type text check (media_type in ('video', 'article')) default 'video',
  title text not null,
  url text,
  thumbnail_url text,
  description text,
  date_added date default now()
);

-- ---------------------------------------------------------------------
-- Testimonials / Member Spotlights
-- ---------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  member_name text not null,
  member_role text,
  testimonial_text text,
  photo_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Site Settings (About / Mission / Vision / Contact copy)
-- ---------------------------------------------------------------------
create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  section_name text unique not null,
  content_html text,
  updated_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------
create index if not exists idx_officers_order on officers (display_order);
create index if not exists idx_achievements_order on achievements (display_order);
create index if not exists idx_productions_status on productions (status);
create index if not exists idx_productions_order on productions (display_order);
create index if not exists idx_events_date on events (event_date);
create index if not exists idx_gallery_category on gallery (category);
create index if not exists idx_media_type on media (media_type);
create index if not exists idx_testimonials_order on testimonials (display_order);

-- ---------------------------------------------------------------------
-- Row Level Security: public read access, authenticated write access
-- ---------------------------------------------------------------------
alter table officers enable row level security;
alter table achievements enable row level security;
alter table productions enable row level security;
alter table events enable row level security;
alter table gallery enable row level security;
alter table media enable row level security;
alter table testimonials enable row level security;
alter table site_settings enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['officers','achievements','productions','events','gallery','media','testimonials','site_settings']
  loop
    execute format('drop policy if exists "Public read access" on %I;', t);
    execute format('create policy "Public read access" on %I for select using (true);', t);

    execute format('drop policy if exists "Authenticated write access" on %I;', t);
    execute format(
      'create policy "Authenticated write access" on %I for all using (auth.role() = ''authenticated'') with check (auth.role() = ''authenticated'');',
      t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- Storage bucket for uploaded images (officers, posters, gallery, etc.)
-- Run separately if storage extension policies are required:
-- insert into storage.buckets (id, name, public) values ('cde-media', 'cde-media', true)
-- on conflict (id) do nothing;
-- ---------------------------------------------------------------------
