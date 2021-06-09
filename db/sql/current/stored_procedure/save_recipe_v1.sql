DROP PROCEDURE IF EXISTS save_recipe_v1;

DELIMITER // 

CREATE PROCEDURE save_recipe_v1 (
  IN parameter_name VARCHAR(128)) BEGIN

  INSERT INTO `recipe` (recipe_name, created, updated, active)
  VALUES
  (parameter_name, NOW(), NOW(), 1);

  SELECT LAST_INSERT_ID() AS RecipeId;

END;

//

DELIMITER ;
