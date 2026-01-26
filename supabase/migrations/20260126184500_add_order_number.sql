-- Add order_number to orders
alter table "public"."orders" add column if not exists "order_number" text;
alter table "public"."orders" alter column "status" set default 'pending';

-- Rename columns in orders to match request if necessary
-- Request: id, created_at, email, order_number, total_price, status
-- Current: id, created_at, customer_email, order_number, total_amount, status
-- I will keep my current names but add aliases or just map them in the code.
-- Actually I'll add the missing columns or rename if safe.
-- To avoid breaking existing code, I'll add columns if they are missing.

alter table "public"."orders" add column if not exists "email" text;
alter table "public"."orders" add column if not exists "total_price" decimal(10,2);

-- Update order_items to match request: id, order_id (FK), product_slug, quantity, price
alter table "public"."order_items" add column if not exists "product_slug" text;
alter table "public"."order_items" add column if not exists "price" decimal(10,2);
alter table "public"."order_items" add column if not exists "size" text;
alter table "public"."order_items" add column if not exists "orientation" text;

-- Make product_id optional since we are using product_slug
alter table "public"."order_items" alter column "product_id" drop not exists; -- Wait, it's not null.
ALTER TABLE "public"."order_items" ALTER COLUMN "product_id" DROP NOT NULL;

-- RLS
alter table "public"."orders" enable row level security;
alter table "public"."order_items" enable row level security;

create policy "Enable insert for orders" on "public"."orders"
as permissive for insert
to public
with check (true);

create policy "Enable insert for order items" on "public"."order_items"
as permissive for insert
to public
with check (true);

create policy "Enable read for orders" on "public"."orders"
as permissive for select
to public
using (true);

create policy "Enable read for order items" on "public"."order_items"
as permissive for select
to public
using (true);
