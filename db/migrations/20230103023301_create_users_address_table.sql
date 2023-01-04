-- migrate:up
CREATE TABLE `users_address` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `address` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(255) NOT NULL,
  `user_id` INT NOT NULL,
  CONSTRAINT users_address_fk FOREIGN KEY (user_id) REFERENCES users (id),
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE users_address;
