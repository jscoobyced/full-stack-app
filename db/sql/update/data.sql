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
  (11, 15),
  (11, 16),
  (11, 17),
  (12, 18),
  (12, 19),
  (12, 20);
