create table if not exists public.days (
  user_id uuid not null references auth.users(id) on delete cascade,
  day_key date not null,
  calorie_goal integer not null default 2000,
  step_goal integer not null default 8000,
  foods jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, day_key)
);
alter table public.days enable row level security;
create policy "users read own days" on public.days for select using (auth.uid()=user_id);
create policy "users insert own days" on public.days for insert with check (auth.uid()=user_id);
create policy "users update own days" on public.days for update using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users delete own days" on public.days for delete using (auth.uid()=user_id);
