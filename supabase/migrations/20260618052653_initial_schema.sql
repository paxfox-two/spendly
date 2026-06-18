-- 사용자 프로필 테이블 (auth.users와 연동)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 거래 내역 테이블
create table public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  store_name text not null,
  amount numeric not null,
  category text,
  is_subscription boolean default false,
  memo text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS (Row Level Security) 설정
alter table public.profiles enable row level security;
alter table public.transactions enable row level security;

-- profiles 정책: 본인 데이터만 읽기/수정 가능
create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- transactions 정책: 본인 데이터만 CRUD 가능
create policy "Users can view their own transactions" on public.transactions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own transactions" on public.transactions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own transactions" on public.transactions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own transactions" on public.transactions
  for delete using (auth.uid() = user_id);

-- auth.users에 새 사용자가 생길 때 profiles에 자동 삽입하는 트리거
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
