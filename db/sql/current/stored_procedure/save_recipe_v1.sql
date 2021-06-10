DROP PROCEDURE IF EXISTS save_recipe_v1;

DELIMITER // 

CREATE PROCEDURE save_recipe_v1 (
  IN parameter_name VARCHAR(128),
  IN parameter_uid VARCHAR(32)) BEGIN

  INSERT INTO `recipe` (recipe_name, `user`, created, updated, active)
  VALUES
  (parameter_name, parameter_uid, NOW(), NOW(), 1);

  SELECT LAST_INSERT_ID() AS RecipeId;

END;

//

DELIMITER ;
