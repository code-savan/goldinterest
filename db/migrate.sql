CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  old_price NUMERIC,
  rating NUMERIC NOT NULL DEFAULT 4.8,
  reviews INTEGER NOT NULL DEFAULT 0,
  colors JSONB NOT NULL DEFAULT '[]',
  sizes JSONB,
  description TEXT NOT NULL DEFAULT '',
  details JSONB NOT NULL DEFAULT '[]',
  images JSONB NOT NULL DEFAULT '[]',
  badge TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  featured_ids JSONB NOT NULL DEFAULT '[]',
  announcement TEXT NOT NULL DEFAULT 'Free shipping on every order, worldwide',
  hero_kicker TEXT NOT NULL DEFAULT 'Gold Interest, Est. 2024',
  hero_title_top TEXT NOT NULL DEFAULT 'Everything',
  hero_title_accent TEXT NOT NULL DEFAULT 'for your',
  hero_title_bottom TEXT NOT NULL DEFAULT 'Space',
  hero_subtitle TEXT NOT NULL DEFAULT 'Wallpapers, printable posters, framed wall art and apparel. Carefully made with a smooth matte finish, heavyweight cotton and small gold details. Free shipping on every order.'
);

INSERT INTO settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS promos (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL DEFAULT 'percent',
  value NUMERIC NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  usage_limit INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL,
  discount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending',
  promo_code TEXT,
  whop_payment_id TEXT,
  whop_plan_id TEXT,
  whop_checkout_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY,
  received_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
