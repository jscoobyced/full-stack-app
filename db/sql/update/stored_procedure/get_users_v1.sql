DROP PROCEDURE IF EXISTS get_user_v1;

DELIMITER //
CREATE PROCEDURE
  get_users_v1
  (IN parameter_active BOOLEAN)
  BEGIN
    SELECT
      id,
      username,
      firstname,
      lastname,
      created,
      updated,
      active
    FROM user u
    WHERE u.active = parameter_active;
  END;
//
DELIMITER ;