DROP PROCEDURE IF EXISTS get_user_by_reference_id_v1;

DELIMITER // 

CREATE PROCEDURE get_user_by_reference_id_v1 (
  IN parameter_uid VARCHAR(32),
  IN parameter_active BOOLEAN) BEGIN
SELECT
  u.`uid` AS UserUid,
  u.allowed AS UserIsAllowed,
  u.created AS UserCreated,
  u.updated AS UserUpdated,
  u.active AS UserActive
FROM
  user u
WHERE
  u.`uid` = parameter_uid
  AND u.active = parameter_active;

END;

//

DELIMITER ;
