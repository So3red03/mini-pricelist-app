create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  article_no text not null,
  name text not null,
  in_price numeric(12, 2) not null default 0,
  price numeric(12, 2) not null default 0,
  unit text not null,
  in_stock integer not null default 0,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists translations (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  en text not null,
  sv text not null,
  created_at timestamptz not null default now()
);
