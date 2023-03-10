-- migrate:up
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `gender_id` INT NOT NULL,
  `point` DECIMAL(10, 3) DEFAULT 100000,
	`co2` DECIMAL(10, 3) DEFAULT 0,
  `date_of_birth` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT users_fk FOREIGN KEY (gender_id) REFERENCES gender (id)
);

-- migrate:down
DROP TABLE users;
