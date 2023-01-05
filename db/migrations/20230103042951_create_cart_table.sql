-- migrate:up
CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  CONSTRAINT cart_user_id FOREIGN KEY (user_id) REFERENCES users (id), 
  CONSTRAINT cart_product_id FOREIGN KEY (product_id) REFERENCES products (id)
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE cart;
