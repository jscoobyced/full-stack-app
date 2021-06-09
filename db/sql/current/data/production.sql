INSERT INTO
  `category` (`name`, created, updated, active)
VALUES
  ('Solids', NOW(), NOW(), 1),
  ('Liquids', NOW(), NOW(), 1),
  ('Volume', NOW(), NOW(), 1),
  ('Mass', NOW(), NOW(), 1);

INSERT INTO
  `unit` (
    id,
    `name`,
    symbol,
    category,
    created,
    updated,
    active
  )
VALUES
  (1, 'Cup', 'cup', 3, NOW(), NOW(), 1),
  (2, 'Table Spoon', 'tbsp', 3, NOW(), NOW(), 1),
  (3, 'Tea Spoon', 'tsp', 3, NOW(), NOW(), 1),
  (4, 'Milliliter', 'ml', 3, NOW(), NOW(), 1),
  (5, 'Gram', 'g', 4, NOW(), NOW(), 1),
  (6, 'Fluid Ounce', 'oz', 3, NOW(), NOW(), 1),
  (7, 'Liter', 'l', 3, NOW(), NOW(), 1),
  (8, 'Piece', 'pc', 3, NOW(), NOW(), 1);

INSERT INTO
  `ingredient` (
    id,
    `name`,
    category,
    created,
    updated,
    active
  )
VALUES
  (1, 'Bread Flour', 1, NOW(), NOW(), 1),
  (2, 'Whole Wheat Flour', 1, NOW(), NOW(), 1),
  (3, 'Oat', 1, NOW(), NOW(), 1),
  (4, 'Flaxseed', 1, NOW(), NOW(), 1),
  (5, 'Yeast', 1, NOW(), NOW(), 1),
  (6, 'Honey', 2, NOW(), NOW(), 1),
  (7, 'Water', 2, NOW(), NOW(), 1),
  (8, 'Milk', 2, NOW(), NOW(), 1),
  (9, 'Egg', 2, NOW(), NOW(), 1),
  (10, 'Sugar', 1, NOW(), NOW(), 1),
  (11, 'Coconut Oil', 2, NOW(), NOW(), 1),
  (12, 'Vegetable Oil', 2, NOW(), NOW(), 1),
  (13, 'Soda Water', 2, NOW(), NOW(), 1),
  (14, 'Butter', 1, NOW(), NOW(), 1),
  (15, 'Egg Yolk', 2, NOW(), NOW(), 1),
  (16, 'Egg White', 2, NOW(), NOW(), 1),
  (17, 'Salt', 1, NOW(), NOW(), 1);

INSERT INTO
  `calorie` (
    id,
    ingredient,
    unit,
    serving,
    calories,
    created,
    updated,
    active
  )
VALUES
  -- Bread Flour
  (1, 1, 1, 1, 361, NOW(), NOW(), 1),
  (2, 1, 2, 16, 361, NOW(), NOW(), 1),
  (3, 1, 5, 120, 361, NOW(), NOW(), 1),
  -- Whole Wheat Flour
  (4, 2, 1, 1, 340, NOW(), NOW(), 1),
  (5, 2, 2, 16, 340, NOW(), NOW(), 1),
  (6, 2, 5, 120, 340, NOW(), NOW(), 1),
  -- Oat
  (7, 3, 1, 1, 308, NOW(), NOW(), 1),
  (8, 3, 2, 16, 308, NOW(), NOW(), 1),
  (9, 3, 5, 90, 308, NOW(), NOW(), 1),
  -- Flaxseed
  (10, 4, 1, 1, 774, NOW(), NOW(), 1),
  (11, 4, 2, 16, 774, NOW(), NOW(), 1),
  (12, 4, 5, 149, 774, NOW(), NOW(), 1),
  -- Yeast
  (13, 5, 1, 1, 105, NOW(), NOW(), 1),
  (14, 5, 2, 16, 105, NOW(), NOW(), 1),
  (15, 5, 3, 48, 105, NOW(), NOW(), 1),
  (16, 5, 5, 150, 105, NOW(), NOW(), 1),
  -- Honey
  (17, 6, 1, 1, 1031, NOW(), NOW(), 1),
  (18, 6, 2, 16, 64, NOW(), NOW(), 1),
  (19, 6, 4, 237, 64, NOW(), NOW(), 1),
  (20, 6, 7, 0.237, 64, NOW(), NOW(), 1),
  -- Water
  (21, 7, 1, 1, 0, NOW(), NOW(), 1),
  (22, 7, 2, 16, 0, NOW(), NOW(), 1),
  (23, 7, 4, 237, 0, NOW(), NOW(), 1),
  (24, 7, 7, 0.237, 0, NOW(), NOW(), 1),
  -- Milk
  (25, 8, 1, 1, 103, NOW(), NOW(), 1),
  (26, 8, 2, 16, 103, NOW(), NOW(), 1),
  (27, 8, 4, 237, 103, NOW(), NOW(), 1),
  (28, 8, 7, 0.237, 103, NOW(), NOW(), 1),
  -- Egg
  (29, 9, 8, 1, 78, NOW(), NOW(), 1),
  (30, 9, 2, 2, 78, NOW(), NOW(), 1),
  (31, 9, 4, 30, 78, NOW(), NOW(), 1),
  (32, 9, 7, 0.03, 78, NOW(), NOW(), 1),
  -- Sugar
  (33, 10, 1, 1, 773, NOW(), NOW(), 1),
  (34, 10, 2, 16, 773, NOW(), NOW(), 1),
  (35, 10, 5, 201, 773, NOW(), NOW(), 1),
  -- Coconut Oil
  (36, 11, 1, 1, 1600, NOW(), NOW(), 1),
  (37, 11, 2, 16, 1600, NOW(), NOW(), 1),
  (38, 11, 3, 48, 1600, NOW(), NOW(), 1),
  (39, 11, 4, 250, 1600, NOW(), NOW(), 1),
  (40, 11, 7, 0.25, 1600, NOW(), NOW(), 1),
  -- Vegetable Oil
  (41, 12, 1, 1, 2080, NOW(), NOW(), 1),
  (42, 12, 2, 16, 2080, NOW(), NOW(), 1),
  (43, 12, 3, 48, 2080, NOW(), NOW(), 1),
  (44, 12, 4, 250, 2080, NOW(), NOW(), 1),
  (45, 12, 7, 0.25, 2080, NOW(), NOW(), 1),
  -- Soda Water
  (46, 13, 1, 1, 0, NOW(), NOW(), 1),
  (47, 13, 2, 16, 0, NOW(), NOW(), 1),
  (48, 13, 4, 237, 0, NOW(), NOW(), 1),
  (49, 13, 7, 0.237, 0, NOW(), NOW(), 1),
  -- Butter
  (50, 14, 1, 1, 1627, NOW(), NOW(), 1),
  (51, 14, 5, 227, 1627, NOW(), NOW(), 1),
  -- Egg Yolk
  (52, 15, 1, 1, 782, NOW(), NOW(), 1),
  (53, 15, 2, 16, 782, NOW(), NOW(), 1),
  (54, 15, 4, 243, 782, NOW(), NOW(), 1),
  (55, 15, 8, 16, 782, NOW(), NOW(), 1),
  -- Egg White
  (56, 16, 1, 1, 125, NOW(), NOW(), 1),
  (57, 16, 2, 16, 782, NOW(), NOW(), 1),
  (58, 16, 4, 243, 782, NOW(), NOW(), 1),
  (59, 16, 8, 8, 782, NOW(), NOW(), 1),
  -- Salt
  (60, 17, 1, 1, 0, NOW(), NOW(), 1),
  (61, 17, 2, 16, 0, NOW(), NOW(), 1),
  (62, 17, 3, 48, 0, NOW(), NOW(), 1),
  (63, 17, 5, 273, 0, NOW(), NOW(), 1);