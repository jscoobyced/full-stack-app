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
  `calorie` (
    id,
    unit,
    serving,
    calories,
    created,
    updated,
    active
  )
VALUES
  -- Bread Flour
  (1, 1, 1, 361, NOW(), NOW(), 1),
  -- Whole Wheat Flour
  (2, 1, 1, 340, NOW(), NOW(), 1),
  -- Oat
  (3, 1, 1, 308, NOW(), NOW(), 1),
  -- Flaxseed
  (4, 1, 1, 774, NOW(), NOW(), 1),
  -- Yeast
  (5, 3, 1, 13, NOW(), NOW(), 1),
  -- Honey
  (6, 2, 1, 64, NOW(), NOW(), 1),
  -- Water
  (7, 1, 1, 0, NOW(), NOW(), 1),
  -- Milk
  (8, 1, 1, 103, NOW(), NOW(), 1),
  -- Egg
  (9, 8, 1, 78, NOW(), NOW(), 1),
  -- Sugar
  (10, 1, 1, 773, NOW(), NOW(), 1),
  -- Coconut Oil
  (11, 1, 1, 1600, NOW(), NOW(), 1),
  -- Vegetable Oil
  (12, 1, 1, 2080, NOW(), NOW(), 1);

INSERT INTO
  `ingredient` (
    id,
    `name`,
    category,
    base_calories,
    created,
    updated,
    active
  )
VALUES
  (1, 'Bread Flour', 1, 1, NOW(), NOW(), 1),
  (2, 'Whole Wheat Flour', 1, 2, NOW(), NOW(), 1),
  (3, 'Oat', 1, 3, NOW(), NOW(), 1),
  (4, 'Flaxseed', 1, 4, NOW(), NOW(), 1),
  (5, 'Yeast', 1, 5, NOW(), NOW(), 1),
  (6, 'Honey', 2, 6, NOW(), NOW(), 1),
  (7, 'Water', 2, 7, NOW(), NOW(), 1),
  (8, 'Milk', 2, 8, NOW(), NOW(), 1),
  (9, 'Egg', 2, 9, NOW(), NOW(), 1),
  (10, 'Sugar', 1, 10, NOW(), NOW(), 1),
  (11, 'Coconut Oil', 1, 11, NOW(), NOW(), 1),
  (12, 'Vegetable Oil', 1, 12, NOW(), NOW(), 1);

INSERT INTO
  `conversion` (
    id,
    from_unit,
    multiplier,
    created,
    updated,
    active
  )
VALUES
  -- Bread Flour from Gram
  (1, 5, 1 / 150, NOW(), NOW(), 1),
  -- Bread Flour from Table Spoon
  (2, 2, 1 / 16, NOW(), NOW(), 1),
  -- Whole Wheat Flour from Gram
  (3, 5, 1 / 120, NOW(), NOW(), 1),
  -- Whole Wheat Flour from Table Spoon
  (4, 2, 1 / 16, NOW(), NOW(), 1),
  -- Oat from Gram
  (5, 5, 1 / 90, NOW(), NOW(), 1),
  -- Oat from Table Spoon
  (6, 2, 1 / 16, NOW(), NOW(), 1),
  -- Flaxseed from Gram
  (7, 5, 1 / 149, NOW(), NOW(), 1),
  -- Flaxseed from Cup
  (8, 2, 1 / 16, NOW(), NOW(), 1),
  -- Honey from Cup
  (9, 1, 16, NOW(), NOW(), 1),
  -- Milk from Table Spoon
  (10, 2, 1 / 16, NOW(), NOW(), 1),
  -- Milk from Milliliter
  (11, 4, 1 / 237, NOW(), NOW(), 1),
  -- Sugar from Gram
  (12, 5, 1 / 201, NOW(), NOW(), 1),
  -- Sugar from Table Spoon
  (13, 2, 1 / 16, NOW(), NOW(), 1),
  -- Sugar from Tea Spoon
  (14, 3, 1 / 48, NOW(), NOW(), 1),
  -- Coconut Oil from Tablespoon
  (15, 2, 1 / 16, NOW(), NOW(), 1),
  -- Coconut Oil from Tea Spoon
  (16, 3, 1 / 48, NOW(), NOW(), 1),
  -- Coconut Oil from milliliter
  (17, 4, 1 / 236.5, NOW(), NOW(), 1),
  -- Vegetable Oil from Tablespoon
  (18, 2, 1 / 16, NOW(), NOW(), 1),
  -- Vegetable Oil from Tea Spoon
  (19, 3, 1 / 48, NOW(), NOW(), 1),
  -- Vegetable Oil from milliliter
  (20, 4, 1 / 236.5, NOW(), NOW(), 1);

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
  (10, 14),
  (11, 15),
  (11, 16),
  (11, 17),
  (12, 18),
  (12, 19),
  (12, 20);