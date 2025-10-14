-- Gazelle Database Schema
-- Natural Disaster Resource Matching App

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  privy_id TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT,
  phone TEXT,
  address TEXT,
  latitude REAL,
  longitude REAL,
  has_transportation BOOLEAN DEFAULT 0,
  roles TEXT NOT NULL DEFAULT '["seeker"]', -- JSON array: 'seeker', 'provider', 'admin', 'distribution_staff', 'transport_coordinator'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  verification_status TEXT DEFAULT 'pending' -- pending, verified, rejected
);

CREATE INDEX IF NOT EXISTS idx_users_privy_id ON users(privy_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- Locations Table (Distribution Centers, Warehouses, Staging Areas)
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  capacity INTEGER,
  instructions TEXT, -- other details/instructions
  operating_hours TEXT, -- JSON format for flexible scheduling
  contact_info TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_locations_active ON locations(is_active);
CREATE INDEX IF NOT EXISTS idx_locations_coords ON locations(latitude, longitude);

-- Supply Categories Table
CREATE TABLE IF NOT EXISTS supply_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL, -- 'food', 'water', 'medical', 'shelter', 'clothing', etc.
  is_perishable BOOLEAN DEFAULT 0,
  unit_of_measure TEXT, -- 'lbs', 'gallons', 'units', 'boxes', etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_supply_categories_category ON supply_categories(category);

-- Supplies Table
CREATE TABLE IF NOT EXISTS supplies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  location_id INTEGER NOT NULL,
  quantity REAL NOT NULL DEFAULT 0,
  weight REAL, -- in lbs or kg
  dimensions TEXT, -- text field for length x width x height
  expiration_date DATE,
  added_by_user_id INTEGER NOT NULL,
  status TEXT DEFAULT 'available', -- 'available', 'reserved', 'distributed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES supply_categories(id),
  FOREIGN KEY (location_id) REFERENCES locations(id),
  FOREIGN KEY (added_by_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_supplies_category ON supplies(category_id);
CREATE INDEX IF NOT EXISTS idx_supplies_location ON supplies(location_id);
CREATE INDEX IF NOT EXISTS idx_supplies_status ON supplies(status);
CREATE INDEX IF NOT EXISTS idx_supplies_provider ON supplies(added_by_user_id);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  supply_id INTEGER NOT NULL,
  quantity_reserved REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'picked_up', 'cancelled', 'expired'
  reservation_expires_at DATETIME NOT NULL,
  pickup_appointment_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  fulfilled_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (supply_id) REFERENCES supplies(id)
);

CREATE INDEX IF NOT EXISTS idx_reservations_user ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_supply ON reservations(supply_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_expires ON reservations(reservation_expires_at);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reservation_id INTEGER,
  user_id INTEGER NOT NULL,
  supply_id INTEGER NOT NULL,
  quantity REAL NOT NULL,
  transaction_type TEXT NOT NULL, -- 'pickup', 'delivery', 'donation'
  verification_method TEXT, -- 'qr_code', 'pin', 'signature'
  verification_data TEXT, -- JSON for storing verification details
  location_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reservation_id) REFERENCES reservations(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (supply_id) REFERENCES supplies(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_supply ON transactions(supply_id);
CREATE INDEX IF NOT EXISTS idx_transactions_location ON transactions(location_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);

-- Safety Alerts Table
CREATE TABLE IF NOT EXISTS safety_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  alert_type TEXT NOT NULL, -- 'road_closure', 'flood', 'hazard', 'evacuation'
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  affected_area TEXT, -- JSON with coordinates or address
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_safety_alerts_active ON safety_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_safety_alerts_severity ON safety_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_safety_alerts_expires ON safety_alerts(expires_at);

-- News Alerts Table
CREATE TABLE IF NOT EXISTS news_alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  url TEXT, -- optional link to full article
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_news_alerts_active ON news_alerts(is_active);
CREATE INDEX IF NOT EXISTS idx_news_alerts_priority ON news_alerts(priority);
CREATE INDEX IF NOT EXISTS idx_news_alerts_expires ON news_alerts(expires_at);
