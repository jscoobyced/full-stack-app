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

CREATE TABLE `recipe` (
  id INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(32),
  recipe_name VARCHAR(128),
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE
  `recipe`
ADD
  CONSTRAINT FK_user_recipe FOREIGN KEY (`user`) REFERENCES `user`(`uid`);

CREATE TABLE `selected_ingredient` (
  id INT NOT NULL AUTO_INCREMENT,
  recipe INT,
  ingredient INT,
  calorie INT,
  serving DOUBLE,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

ALTER TABLE
  `selected_ingredient`
ADD
  CONSTRAINT FK_recipe_selected_ingredient FOREIGN KEY (recipe) REFERENCES `recipe`(id);

ALTER TABLE
  `selected_ingredient`
ADD
  CONSTRAINT FK_ingredient_selected_ingredient FOREIGN KEY (ingredient) REFERENCES `ingredient`(id);

ALTER TABLE
  `selected_ingredient`
ADD
  CONSTRAINT FK_calorie_selected_ingredient FOREIGN KEY (calorie) REFERENCES `calorie`(id);
