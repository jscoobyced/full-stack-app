ALTER TABLE `recipe`
ADD COLUMN `user` VARCHAR(32)
AFTER id;

ALTER TABLE
  `recipe`
ADD
  CONSTRAINT FK_user_recipe FOREIGN KEY (`user`) REFERENCES `user`(`uid`);
