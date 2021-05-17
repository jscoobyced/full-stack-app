DROP PROCEDURE IF EXISTS get_categories_v1;

DELIMITER / / CREATE PROCEDURE get_categories_v1 (IN parameter_active BOOLEAN) BEGIN
SELECT
  id,
  `name`,
  created,
  updated,
  active
FROM
  category c
WHERE
  c.active = parameter_active;

END;

/ / DELIMITER;