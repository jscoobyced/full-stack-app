DROP PROCEDURE IF EXISTS get_user_by_username_v1;

DELIMITER //
CREATE PROCEDURE
  get_user_by_username_v1
  (IN parameter_username VARCHAR(16))
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
    WHERE u.username = parameter_username;
  END;
//
DELIMITER ;