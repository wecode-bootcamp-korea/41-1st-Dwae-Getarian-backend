-- migrate:up
CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  CONSTRAINT cart_user_id FOREIGN KEY (user_id) REFERENCES users (id), 
);

-- migrate:down
DROP TABLE cart;
