DROP PROCEDURE IF EXISTS store_user_login_v1;

DELIMITER // 

CREATE PROCEDURE store_user_login_v1 (IN parameter_uid VARCHAR(32)) BEGIN
  INSERT INTO `user` (`uid`, created, updated, active)
  VALUES
  (parameter_uid, NOW(), NOW(), 1)
  ON DUPLICATE KEY UPDATE updated=NOW()
  ;
END;

//

DELIMITER ;
