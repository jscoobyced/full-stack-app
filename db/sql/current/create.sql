CREATE TABLE `category` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

CREATE TABLE `unit` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  symbol VARCHAR(8),
  category INT,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE
  `unit`
ADD
  CONSTRAINT FK_category_unit FOREIGN KEY (category) REFERENCES `category`(id);

CREATE TABLE `ingredient` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  category INT,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE
  `ingredient`
ADD
  CONSTRAINT FK_category_ingredient FOREIGN KEY (category) REFERENCES `category`(id);

CREATE TABLE `calorie` (
  id INT NOT NULL AUTO_INCREMENT,
  ingredient INT NOT NULL,
  unit INT,
  serving INT,
  calories DOUBLE,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE
  `calorie`
ADD
  CONSTRAINT FK_unit_calorie FOREIGN KEY (unit) REFERENCES `unit`(id);

ALTER TABLE
  `calorie`
ADD
  CONSTRAINT FK_ingredient_calorie FOREIGN KEY (ingredient) REFERENCES `ingredient`(id);

CREATE TABLE `user` (
  `uid` VARCHAR(32) NOT NULL,
  allowed TINYINT DEFAULT 0,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (`uid`)
);
