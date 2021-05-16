CREATE TABLE `user` (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  firstname VARCHAR(32),
  lastname VARCHAR(32),
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);