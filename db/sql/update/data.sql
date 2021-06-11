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
  (18, 'Buckwheat Flour', 1, NOW(), NOW(), 1),
  (19, 'Rice Flour', 1, NOW(), NOW(), 1),
  (20, 'All Purpose Flour', 1, NOW(), NOW(), 1);

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
  -- Buckwheat Flour
  (64, 18, 1, 1, 402, NOW(), NOW(), 1),
  (65, 18, 2, 16, 402, NOW(), NOW(), 1),
  (66, 18, 5, 120, 402, NOW(), NOW(), 1),
  -- Rice Flour
  (67, 19, 1, 1, 366, NOW(), NOW(), 1),
  (68, 19, 2, 16, 366, NOW(), NOW(), 1),
  (69, 19, 5, 120, 366, NOW(), NOW(), 1),
  -- All Purpose Flour
  (70, 19, 1, 1, 364, NOW(), NOW(), 1),
  (71, 19, 2, 16, 364, NOW(), NOW(), 1),
  (72, 19, 5, 120, 364, NOW(), NOW(), 1),
  -- Coconut Oil
  (73, 11, 5, 209, 1600, NOW(), NOW(), 1),
  -- Vegetable Oil
  (74, 12, 5, 240, 2080, NOW(), NOW(), 1),
  -- Honey
  (75, 6, 5, 340, 1031, NOW(), NOW(), 1),
  -- Milk
  (76, 8, 5, 240, 103, NOW(), NOW(), 1);
