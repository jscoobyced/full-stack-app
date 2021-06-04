CREATE TABLE `user` (
  `uid` VARCHAR(32) NOT NULL,
  created DATETIME,
  updated DATETIME,
  active BOOLEAN,
  PRIMARY KEY (`uid`)
);
