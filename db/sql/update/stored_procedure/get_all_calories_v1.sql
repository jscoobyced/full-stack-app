DROP PROCEDURE IF EXISTS get_all_calories_v1;

DELIMITER // 

CREATE PROCEDURE get_all_calories_v1 (IN parameter_active BOOLEAN) BEGIN
SELECT
  c.id AS CalorieId,
  c.ingredient AS CalorieIngredientId,
  c.serving AS CalorieServing,
  c.calories AS CalorieCalories,
  c.created AS CalorieCreated,
  c.updated AS CalorieUpdated,
  c.active AS CalorieActive,
  u.id AS UnitId,
  u.`name` AS UnitName,
  u.symbol AS UnitSymbol,
  u.created AS UnitCreated,
  u.updated AS UnitUpdated,
  u.active AS UnitActive,
  k.id AS CategoryId,
  k.name AS CategoryName,
  k.created AS CategoryCreated,
  k.updated AS CategoryUpdated,
  k.active AS CategoryActive
FROM
  calorie c
  INNER JOIN unit u ON c.unit = u.id
  AND u.active = parameter_active
  INNER JOIN category k ON u.category = k.id
  AND k.active = parameter_active
WHERE
  c.active = parameter_active;

END;

//

DELIMITER ;
