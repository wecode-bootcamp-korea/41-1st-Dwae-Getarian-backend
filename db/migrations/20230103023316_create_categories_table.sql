-- migrate:up
CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255)
);

-- migrate:down
DROP TABLE categories;
