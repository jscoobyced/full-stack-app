DROP PROCEDURE IF EXISTS get_all_ingredients_with_categories_v1;

DELIMITER //

CREATE PROCEDURE get_all_ingredients_with_categories_v1 (IN parameter_active BOOLEAN) BEGIN
SELECT
  i.id AS IngredientId,
  i.`name` AS IngredientName,
  i.created AS IngredientCreated,
  i.updated AS IngredientUpdated,
  i.active AS IngredientActive,
  c.id AS CategoryId,
  c.name AS CategoryName,
  c.created AS CategoryCreated,
  c.updated AS CategoryUpdated,
  c.active AS CategoryActive
FROM
  ingredient i
  INNER JOIN category c ON i.category = c.id
  AND c.active = parameter_active
WHERE
  i.active = parameter_active;
END;

//

DELIMITER ;
