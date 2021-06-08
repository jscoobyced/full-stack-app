ALTER TABLE `user`
ADD COLUMN allowed TINYINT DEFAULT 0
AFTER `uid`;

CREATE TABLE `recipe` (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_name VARCHAR(128),
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (id)
);

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

