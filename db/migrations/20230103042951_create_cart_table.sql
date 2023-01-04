-- migrate:up
CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  CONSTRAINT cart_user_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT cart_product_fk FOREIGN KEY (product_id) REFERENCES users (id),
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE cart;
