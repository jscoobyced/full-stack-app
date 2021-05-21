INSERT INTO `category` (`name`, created, updated, active)
VALUES
('Solids', NOW(), NOW(), 1),
('Liquids', NOW(), NOW(), 1);

INSERT INTO `unit` (`name`, symbol, created, updated, active)
VALUES
('Cup', 'cup', NOW(), NOW(), 1),
('Table Spoon', 'tbsp', NOW(), NOW(), 1),
('Tea Spoon', 'tsp', NOW(), NOW(), 1),
('Milliliter', 'ml', NOW(), NOW(), 1),
('Gram', 'g', NOW(), NOW(), 1),
('Ounce', 'oz', NOW(), NOW(), 1),
('Liter', 'l', NOW(), NOW(), 1);

INSERT INTO `calorie` (unit, serving, calories, created, updated, active)
VALUES
-- Bread Flour
(1, 1, 361, NOW(), NOW(), 1),
-- Whole Wheat Flour
(1, 1, 340, NOW(), NOW(), 1),
-- Oat
(1, 1, 308, NOW(), NOW(), 1),
-- Flaxseed
(2, 1, 37, NOW(), NOW(), 1),
-- Yeast
(3, 1, 13, NOW(), NOW(), 1),
-- Honey
(2, 1, 64, NOW(), NOW(), 1),
-- Water
(1, 1, 0, NOW(), NOW(), 1);

INSERT INTO `ingredient` (`name`, category, base_calories, created, updated, active)
VALUES
('Bread Flour', 1, 1, NOW(), NOW(), 1),
('Whole Wheat Flour', 1, 2, NOW(), NOW(), 1),
('Oat', 1, 3, NOW(), NOW(), 1),
('Flaxseed', 1, 4, NOW(), NOW(), 1),
('Yeast', 1, 5, NOW(), NOW(), 1),
('Honey', 2, 6, NOW(), NOW(), 1),
('Water', 2, 7, NOW(), NOW(), 1);