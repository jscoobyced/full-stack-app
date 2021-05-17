CREATE TABLE `category` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

CREATE TABLE `ingredient` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  category INT,
  calories INT,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);