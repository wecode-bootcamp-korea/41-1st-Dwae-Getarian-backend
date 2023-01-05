-- migrate:up
CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `order_status_id` INT NOT NULL,
  CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_user_id_fk FOREIGN KEY (order_status_id) REFERENCES orders (id)
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE orders; 
