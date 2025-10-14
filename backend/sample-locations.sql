-- Sample Locations for Los Angeles Area
-- Fire disaster relief centers

-- 1. Pasadena Community Center
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active)
VALUES (
  'Pasadena Community Center',
  '1035 S Fair Oaks Ave, Pasadena, CA 91105',
  34.1316,
  -118.1515,
  500,
  'Enter through main entrance. Parking available in rear lot.',
  '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-18:00", "sunday": "9:00-18:00"}',
  'Phone: (626) 744-7300',
  1
);

-- 2. Pacific Palisades Relief Station
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active)
VALUES (
  'Pacific Palisades Relief Station',
  '861 Alma Real Dr, Pacific Palisades, CA 90272',
  34.0455,
  -118.5260,
  300,
  'Distribution center for coastal areas. Follow signs to supply pickup area.',
  '{"monday": "7:00-19:00", "tuesday": "7:00-19:00", "wednesday": "7:00-19:00", "thursday": "7:00-19:00", "friday": "7:00-19:00", "saturday": "8:00-17:00", "sunday": "8:00-17:00"}',
  'Phone: (310) 454-1412',
  1
);

-- 3. Downtown LA Distribution Hub
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active)
VALUES (
  'Downtown LA Distribution Hub',
  '221 N Figueroa St, Los Angeles, CA 90012',
  34.0549,
  -118.2426,
  1000,
  'Large capacity distribution center. Drive-through pickup available.',
  '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-22:00", "sunday": "6:00-22:00"}',
  'Phone: (213) 485-4500',
  1
);

-- 4. Koreatown Relief Center
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active)
VALUES (
  'Koreatown Relief Center',
  '4201 Wilshire Blvd, Los Angeles, CA 90010',
  34.0617,
  -118.3089,
  400,
  'Bilingual staff available (English/Korean). Street parking available.',
  '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "9:00-19:00", "sunday": "9:00-19:00"}',
  'Phone: (213) 383-8020',
  1
);

-- 5. Arcadia Emergency Depot
INSERT INTO locations (name, address, latitude, longitude, capacity, instructions, operating_hours, contact_info, is_active)
VALUES (
  'Arcadia Emergency Depot',
  '375 Campus Dr, Arcadia, CA 91007',
  34.1331,
  -118.0353,
  600,
  'Located at community center. Follow emergency signs.',
  '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "8:00-20:00", "sunday": "8:00-20:00"}',
  'Phone: (626) 574-5113',
  1
);
