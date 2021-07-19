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
  (21, 'Chicken Thigh', 1, NOW(), NOW(), 1),
  (22, 'Chicken Breast', 1, NOW(), NOW(), 1),
  (23, 'Potato', 1, NOW(), NOW(), 1);

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
  -- Chicken Thigh
  (77, 21, 5, 100, 177, NOW(), NOW(), 1),
  -- Chicken Breast
  (78, 22, 5, 100, 165, NOW(), NOW(), 1),
  -- Potato
  (79, 25, 5, 100, 77, NOW(), NOW(), 1);
