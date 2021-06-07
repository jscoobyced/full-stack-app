DROP PROCEDURE IF EXISTS save_selected_ingredients_v1;

DELIMITER // 

CREATE PROCEDURE save_selected_ingredients_v1 (
  IN parameter_recipe INT,
  IN parameter_ingredient INT,
  IN parameter_calorie INT,
  IN parameter_serving DOUBLE) BEGIN

  INSERT INTO `selected_ingredient` (recipe, ingredient, calorie, serving, created, updated, active)
  VALUES
  (parameter_recipe, parameter_ingredient, parameter_calorie, parameter_serving, NOW(), NOW(), 1);
  
  SELECT LAST_INSERT_ID() AS SelectedIngredientId;
END;

//

DELIMITER ;
