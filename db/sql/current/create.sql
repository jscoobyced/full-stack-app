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

ALTER TABLE `unit`
ADD CONSTRAINT FK_category_unit
FOREIGN KEY (category) REFERENCES `category`(id);

CREATE TABLE `calorie` (
  id INT NOT NULL AUTO_INCREMENT,
  unit INT,
  serving INT,
  calories DOUBLE,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE `calorie`
ADD CONSTRAINT FK_unit_calorie
FOREIGN KEY (unit) REFERENCES `unit`(id);

CREATE TABLE `conversion` (
  id INT NOT NULL AUTO_INCREMENT,
  from_unit INT,
  multiplier DOUBLE,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE `conversion`
ADD CONSTRAINT FK_unit_conversion
FOREIGN KEY (from_unit) REFERENCES `unit`(id);

CREATE TABLE `ingredient` (
  id INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  category INT,
  base_calories INT,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE `ingredient`
ADD CONSTRAINT FK_category_ingredient
FOREIGN KEY (category) REFERENCES `category`(id);

ALTER TABLE `ingredient`
ADD CONSTRAINT FK_calorie_ingredient
FOREIGN KEY (base_calories) REFERENCES `calorie`(id);

CREATE TABLE `ingredient_conversion` (
  ingredient_id INT,
  conversion_id INT
);

ALTER TABLE `ingredient_conversion`
ADD CONSTRAINT FK_ingredient_ingredientconversion
FOREIGN KEY (ingredient_id) REFERENCES `ingredient`(id);

ALTER TABLE `ingredient_conversion`
ADD CONSTRAINT FK_conversion_ingredientconversion
FOREIGN KEY (conversion_id) REFERENCES `conversion`(id);
