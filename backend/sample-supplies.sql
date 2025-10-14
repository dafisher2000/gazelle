-- Sample Supplies for LA Area Fire Disaster
-- Distributed across 5 locations

-- Get location IDs (they should be 2-6 since we already have ID 1)
-- Pasadena = 2, Pacific Palisades = 3, Downtown LA = 4, Koreatown = 5, Arcadia = 6

-- PASADENA COMMUNITY CENTER (ID 2)
-- Water supplies
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bottled Water 16.9oz - 120 cases (24 bottles each)', 1, 2, 120, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('5-gallon Water Jugs', 1, 2, 50, 1, 'available');

-- Food
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Soup (Chicken Noodle, Tomato)', 2, 2, 200, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Beans (Black, Pinto, Kidney)', 2, 2, 150, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Granola Bars - 50 boxes', 2, 2, 50, 1, 'available');

-- Medical
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('First Aid Kits - Large', 3, 2, 25, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('N95 Masks - 500 count', 3, 2, 10, 1, 'available');

-- Baby supplies
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Diapers Size 3 - 30 packs', 8, 2, 30, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Baby Formula (Enfamil)', 8, 2, 40, 1, 'available');


-- PACIFIC PALISADES RELIEF STATION (ID 3)
-- Water
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bottled Water 16.9oz - 80 cases', 1, 3, 80, 1, 'available');

-- Food
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Ready-to-Eat Meals (MRE style)', 2, 3, 100, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Peanut Butter - 75 jars', 2, 3, 75, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Crackers - 60 boxes', 2, 3, 60, 1, 'available');

-- Hygiene
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Toilet Paper - 100 packs (12 rolls each)', 4, 3, 100, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Soap Bars - 200 units', 4, 3, 200, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Toothbrush & Toothpaste Kits', 4, 3, 150, 1, 'available');

-- Bedding
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Blankets - Fleece', 6, 3, 80, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Sleeping Bags', 6, 3, 45, 1, 'available');


-- DOWNTOWN LA DISTRIBUTION HUB (ID 4) - Largest location
-- Water
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bottled Water 16.9oz - 300 cases', 1, 4, 300, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('5-gallon Water Jugs', 1, 4, 150, 1, 'available');

-- Food
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Vegetables (Mixed)', 2, 4, 400, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Fruit', 2, 4, 300, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Rice - 50lb bags', 2, 4, 60, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Pasta - 1lb boxes', 2, 4, 200, 1, 'available');

-- Medical
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('First Aid Kits - Standard', 3, 4, 100, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bandages & Gauze - Variety Pack', 3, 4, 150, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Pain Relievers (Tylenol, Ibuprofen)', 3, 4, 200, 1, 'available');

-- Hygiene
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Feminine Hygiene Products', 4, 4, 250, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Shampoo & Conditioner', 4, 4, 180, 1, 'available');

-- Clothing
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Adult T-Shirts (Assorted Sizes)', 5, 4, 300, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Adult Socks - Packs of 6', 5, 4, 200, 1, 'available');

-- Flashlights & Batteries
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('LED Flashlights', 9, 4, 120, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('AA Batteries - 24 packs', 9, 4, 100, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('D Batteries - 12 packs', 9, 4, 80, 1, 'available');


-- KOREATOWN RELIEF CENTER (ID 5)
-- Water
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bottled Water 16.9oz - 100 cases', 1, 5, 100, 1, 'available');

-- Food
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Instant Ramen Noodles - 200 packs', 2, 5, 200, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Tuna', 2, 5, 150, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Cereal - Various types', 2, 5, 80, 1, 'available');

-- Baby Supplies
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Diapers Size 4 - 25 packs', 8, 5, 25, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Baby Wipes - 50 packs', 8, 5, 50, 1, 'available');

-- Cleaning
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bleach - 1 gallon bottles', 7, 5, 40, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Disinfectant Wipes', 7, 5, 100, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Trash Bags - 50 count boxes', 7, 5, 60, 1, 'available');


-- ARCADIA EMERGENCY DEPOT (ID 6)
-- Water
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Bottled Water 16.9oz - 150 cases', 1, 6, 150, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Water Purification Tablets - 50 packs', 1, 6, 50, 1, 'available');

-- Food
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Canned Chili', 2, 6, 120, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Protein Bars - 40 boxes', 2, 6, 40, 1, 'available');

-- Medical
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Emergency Medical Kits', 3, 6, 30, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Burn Cream & Treatment', 3, 6, 60, 1, 'available');

-- Bedding
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Emergency Blankets (Mylar)', 6, 6, 200, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Pillows', 6, 6, 50, 1, 'available');

-- Tools & Equipment
INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Tarps - 10x12 ft', 10, 6, 40, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Duct Tape - Industrial', 10, 6, 80, 1, 'available');

INSERT INTO supplies (name, category_id, location_id, quantity, added_by_user_id, status)
VALUES ('Multi-tool Sets', 10, 6, 35, 1, 'available');
