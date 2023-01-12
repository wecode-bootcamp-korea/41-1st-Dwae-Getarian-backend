-- migrate:up
CREATE TABLE `cart` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
<<<<<<< HEAD
  CONSTRAINT cart_user_id FOREIGN KEY (user_id) REFERENCES users (id), 
  CONSTRAINT cart_product_id FOREIGN KEY (product_id) REFERENCES products (id)
=======
  CONSTRAINT cart_user_fk FOREIGN KEY (user_id) REFERENCES users (id), 
  CONSTRAINT cart_product_fk FOREIGN KEY (product_id) REFERENCES products (id)
>>>>>>> main
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE cart;
