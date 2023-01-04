-- migrate:up
CREATE TABLE `order_product` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orders_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `order_status_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT order_product_orders_fk FOREIGN KEY (orders_id) REFERENCES orders (id),
  CONSTRAINT order_product_product_fk FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT order_product_order_status_fk FOREIGN KEY (order_status_id) REFERENCES order_status (id),
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE order_product;
