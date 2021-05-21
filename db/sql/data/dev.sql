INSERT INTO
  `category` (`name`, created, updated, active)
VALUES
  ('Solids', NOW(), NOW(), 1),
  ('Liquids', NOW(), NOW(), 1),
  ('Volume', NOW(), NOW(), 1),
  ('Mass', NOW(), NOW(), 1);

INSERT INTO
  `unit` (
    `name`,
    symbol,
    category,
    created,
    updated,
    active
  )
VALUES
  ('Cup', 'cup', 3, NOW(), NOW(), 1),
  ('Table Spoon', 'tbsp', 3, NOW(), NOW(), 1),
  ('Tea Spoon', 'tsp', 3, NOW(), NOW(), 1),
  ('Milliliter', 'ml', 3, NOW(), NOW(), 1),
  ('Gram', 'g', 4, NOW(), NOW(), 1),
  ('Fluid Ounce', 'oz', 3, NOW(), NOW(), 1),
  ('Liter', 'l', 3, NOW(), NOW(), 1),
  ('Piece', 'pc', 3, NOW(), NOW(), 1);

INSERT INTO
  `calorie` (
    unit,
    serving,
    calories,
    created,
    updated,
    active
  )
VALUES
  -- Bread Flour
  (1, 1, 361, NOW(), NOW(), 1),
  -- Whole Wheat Flour
  (1, 1, 340, NOW(), NOW(), 1),
  -- Oat
  (1, 1, 308, NOW(), NOW(), 1),
  -- Flaxseed
  (1, 1, 774, NOW(), NOW(), 1),
  -- Yeast
  (3, 1, 13, NOW(), NOW(), 1),
  -- Honey
  (2, 1, 64, NOW(), NOW(), 1),
  -- Water
  (1, 1, 0, NOW(), NOW(), 1),
  -- Milk
  (1, 1, 103, NOW(), NOW(), 1),
  -- Egg
  (8, 1, 78, NOW(), NOW(), 1),
  -- Sugar
  (1, 1, 773, NOW(), NOW(), 1);

INSERT INTO
  `ingredient` (
    `name`,
    category,
    base_calories,
    created,
    updated,
    active
  )
VALUES
  ('Bread Flour', 1, 1, NOW(), NOW(), 1),
  ('Whole Wheat Flour', 1, 2, NOW(), NOW(), 1),
  ('Oat', 1, 3, NOW(), NOW(), 1),
  ('Flaxseed', 1, 4, NOW(), NOW(), 1),
  ('Yeast', 1, 5, NOW(), NOW(), 1),
  ('Honey', 2, 6, NOW(), NOW(), 1),
  ('Water', 2, 7, NOW(), NOW(), 1),
  ('Milk', 2, 8, NOW(), NOW(), 1),
  ('Egg', 2, 9, NOW(), NOW(), 1),
  ('Sugar', 1, 10, NOW(), NOW(), 1);

INSERT INTO
  `conversion` (from_unit, multiplier, created, updated, active)
VALUES
  -- Bread Flour from Gram
  (5, 1 / 150, NOW(), NOW(), 1),
  -- Bread Flour from Table Spoon
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Whole Wheat Flour from Gram
  (5, 1 / 120, NOW(), NOW(), 1),
  -- Whole Wheat Flour from Table Spoon
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Oat from Gram
  (5, 1 / 90, NOW(), NOW(), 1),
  -- Oat from Table Spoon
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Flaxseed from Gram
  (5, 1 / 149, NOW(), NOW(), 1),
  -- Flaxseed from Cup
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Honey from Cup
  (1, 16, NOW(), NOW(), 1),
  -- Milk from Table Spoon
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Milk from Milliliter
  (4, 1 / 237, NOW(), NOW(), 1),
  -- Sugar from Gram
  (5, 1 / 201, NOW(), NOW(), 1),
  -- Sugar from Table Spoon
  (2, 1 / 16, NOW(), NOW(), 1),
  -- Sugar from Tea Spoon
  (3, 1 / 48, NOW(), NOW(), 1);

INSERT INTO
  `ingredient_conversion`
VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (3, 6),
  (4, 7),
  (4, 8),
  (6, 9),
  (8, 10),
  (8, 11),
  (10, 12),
  (10, 13),
  (10, 14);
  