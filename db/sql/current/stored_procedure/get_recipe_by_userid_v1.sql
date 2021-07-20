DROP PROCEDURE IF EXISTS get_recipes_by_userid_v1;

DELIMITER //

CREATE PROCEDURE get_recipes_by_userid_v1 (
  IN parameter_uid VARCHAR(32),
  IN parameter_active BOOLEAN
) BEGIN
SELECT
  r.id AS RecipeId,
  r.recipe_name AS RecipeName,
  r.user AS RecipeUserId,
  si.id AS RecipeIngredientId,
  si.serving AS RecipeIngredientServing,
  i.id AS IngredientId,
  i.name AS IngredientName,
  ic.id AS IngredientCategoryId,
  ic.name AS IngredientCategoryName,
  ca.id AS CalorieId,
  ca.calories AS CalorieValues,
  ca.ingredient AS CalorieIngredientId,
  ca.serving AS CalorieServing,
  u.id AS CalorieUnitId,
  u.name AS CalorieUnitName,
  u.symbol AS CalorieUnitSymbol,
  ic.id AS CalorieCategoryId,
  ic.name AS CalorieCategoryName
FROM
  recipe r
  INNER JOIN selected_ingredient si ON si.recipe = r.id
  AND si.active = parameter_active
  INNER JOIN ingredient i ON i.id = si.ingredient
  AND i.active = parameter_active
  INNER JOIN category ic ON ic.id = i.category
  AND ic.active = parameter_active
  INNER JOIN calorie ca ON ca.id = si.calorie
  AND ca.active = parameter_active
  INNER JOIN unit u ON u.id = ca.unit
  AND u.active = parameter_active
  INNER JOIN category uc ON uc.id = u.category
  AND uc.active = parameter_active
WHERE
  r.user = parameter_uid
  AND r.active = parameter_active;

END;

//

DELIMITER ;
