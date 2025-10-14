-- Gazelle Database Seed Data
-- Initial supply categories and sample data

-- Insert Supply Categories
INSERT INTO supply_categories (name, category, is_perishable, unit_of_measure) VALUES
  ('Bottled Water', 'water', 0, 'bottles'),
  ('Water Gallon Jugs', 'water', 0, 'gallons'),
  ('Canned Food', 'food', 0, 'cans'),
  ('Fresh Produce', 'food', 1, 'lbs'),
  ('Bread', 'food', 1, 'loaves'),
  ('Rice', 'food', 0, 'lbs'),
  ('Beans', 'food', 0, 'lbs'),
  ('Baby Formula', 'food', 0, 'containers'),
  ('First Aid Kits', 'medical', 0, 'kits'),
  ('Bandages', 'medical', 0, 'boxes'),
  ('Pain Medication', 'medical', 0, 'bottles'),
  ('Prescription Medications', 'medical', 1, 'units'),
  ('Blankets', 'shelter', 0, 'units'),
  ('Tents', 'shelter', 0, 'units'),
  ('Tarps', 'shelter', 0, 'units'),
  ('Sleeping Bags', 'shelter', 0, 'units'),
  ('Clothing - Adult', 'clothing', 0, 'items'),
  ('Clothing - Children', 'clothing', 0, 'items'),
  ('Diapers', 'hygiene', 0, 'packages'),
  ('Toiletries', 'hygiene', 0, 'kits'),
  ('Soap', 'hygiene', 0, 'bars'),
  ('Flashlights', 'supplies', 0, 'units'),
  ('Batteries', 'supplies', 0, 'packages'),
  ('Generators', 'supplies', 0, 'units'),
  ('Cleaning Supplies', 'supplies', 0, 'kits');

-- Insert Sample Locations (You can modify these with real locations)
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active) VALUES
  (
    'Central Distribution Center',
    '123 Main Street, Houston, TX 77002',
    29.7604,
    -95.3698,
    500,
    'Enter through the main entrance. Parking available in rear lot. Please bring ID for verification.',
    '{"monday": "8:00 AM - 6:00 PM", "tuesday": "8:00 AM - 6:00 PM", "wednesday": "8:00 AM - 6:00 PM", "thursday": "8:00 AM - 6:00 PM", "friday": "8:00 AM - 6:00 PM", "saturday": "9:00 AM - 4:00 PM", "sunday": "Closed"}',
    '{"phone": "(555) 123-4567", "email": "central@gazelle.org"}',
    1
  ),
  (
    'Northside Community Center',
    '456 Oak Avenue, Houston, TX 77018',
    29.8544,
    -95.4227,
    300,
    'Use side entrance for faster service. ADA accessible.',
    '{"monday": "9:00 AM - 5:00 PM", "tuesday": "9:00 AM - 5:00 PM", "wednesday": "9:00 AM - 5:00 PM", "thursday": "9:00 AM - 5:00 PM", "friday": "9:00 AM - 5:00 PM", "saturday": "10:00 AM - 2:00 PM", "sunday": "Closed"}',
    '{"phone": "(555) 234-5678", "email": "northside@gazelle.org"}',
    1
  ),
  (
    'Southside Relief Station',
    '789 Elm Street, Houston, TX 77047',
    29.6586,
    -95.3158,
    400,
    'Drive-through pickup available. Walk-ins welcome.',
    '{"monday": "7:00 AM - 7:00 PM", "tuesday": "7:00 AM - 7:00 PM", "wednesday": "7:00 AM - 7:00 PM", "thursday": "7:00 AM - 7:00 PM", "friday": "7:00 AM - 7:00 PM", "saturday": "8:00 AM - 6:00 PM", "sunday": "10:00 AM - 4:00 PM"}',
    '{"phone": "(555) 345-6789", "email": "southside@gazelle.org"}',
    1
  );

-- Insert Sample Safety Alert
INSERT INTO safety_alerts (alert_type, severity, title, description, affected_area, is_active, expires_at) VALUES
  (
    'flood',
    'high',
    'Flash Flood Warning - Downtown Area',
    'Heavy rainfall has caused flash flooding in downtown Houston. Avoid travel in affected areas. Water levels expected to recede by 6 PM.',
    '{"center": {"lat": 29.7604, "lng": -95.3698}, "radius": 5}',
    1,
    datetime('now', '+6 hours')
  );

-- Insert Sample News Alert
INSERT INTO news_alerts (title, content, source, url, priority, is_active, expires_at) VALUES
  (
    'Emergency Distribution Centers Now Open',
    'Three distribution centers are now operational across the city. No appointment necessary. Bring ID and proof of address.',
    'Gazelle Emergency Response',
    'https://gazelle.org/news/centers-open',
    10,
    1,
    datetime('now', '+7 days')
  ),
  (
    'Volunteer Drivers Needed',
    'We urgently need volunteer drivers to help deliver supplies to those unable to reach distribution centers. Sign up at gazelle.org/volunteer',
    'Gazelle Volunteer Coordination',
    'https://gazelle.org/volunteer',
    8,
    1,
    datetime('now', '+7 days')
  );
