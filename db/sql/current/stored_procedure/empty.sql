DROP PROCEDURE IF EXISTS get_all_ingredients_with_categories_v1;

DELIMITER //
CREATE PROCEDURE get_all_ingredients_with_categories_v1
 (IN parameter_active BOOLEAN) BEGIN
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
    c.active AS CategoryActive,
    k.id AS CalorieId,
    k.serving AS CalorieServing,
    k.calories AS CalorieValue,
    k.created AS CalorieCreated,
    k.updated AS CalorieUpdated,
    k.active AS CalorieActive,
    u.id AS UnitId,
    u.name AS UnitName,
    u.symbol AS UnitSymbol,
    u.created AS UnitCreated,
    u.updated AS UnitUpdated,
    u.active AS UnitActive,
    uc.id AS UnitCategoryId,
    uc.name AS UnitCategoryName,
    uc.created AS UnitCategoryCreated,
    uc.updated AS UnitCategoryUpdated,
    uc.active AS UnitCategoryActive,
    co.id AS ConversionId,
    co.multiplier AS ConversionMultiplier,
    co.created AS ConversionCreated,
    co.updated AS ConversionUpdated,
    co.active AS ConversionActive,
    u2.id AS ConversionUnitId,
    u2.name AS ConversionUnitName,
    u2.symbol AS ConversionUnitSymbol,
    u2.created AS ConversionUnitCreated,
    u2.updated AS ConversionUnitUpdated,
    u2.active AS ConversionUnitActive,
    uc2.id AS ConversionUnitCategoryId,
    uc2.name AS ConversionUnitCategoryName,
    uc2.created AS ConversionUnitCategoryCreated,
    uc2.updated AS ConversionUnitCategoryUpdated,
    uc2.active AS ConversionUnitCategoryActive
  FROM ingredient i
  INNER JOIN category c
  ON i.category = c.id
  AND c.active = parameter_active
  INNER JOIN calorie k
  ON i.base_calories = k.id
  AND k.active = parameter_active
  INNER JOIN unit u
  ON k.unit = u.id
  AND u.active = parameter_active
  INNER JOIN category uc
  ON u.category = uc.id
  AND uc.active = parameter_active
  LEFT OUTER JOIN ingredient_conversion ic
  ON i.id = ic.ingredient_id
  LEFT OUTER JOIN conversion co
  ON co.id = ic.conversion_id
  AND co.active = parameter_active
  LEFT OUTER JOIN unit u2
  ON co.from_unit = u2.id
  AND u2.active = parameter_active
  LEFT OUTER JOIN category uc2
  ON u2.category = uc2.id
  AND uc2.active = parameter_active
  WHERE
    i.active = parameter_active;
  END;
//

DELIMITER ;
