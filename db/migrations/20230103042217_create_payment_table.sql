-- migrate:up
CREATE TABLE `payment` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orders_id` INT NOT NULL,
  `payment_type` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `total_cost` DECIMAL(10, 3),
  CONSTRAINT payment_fk FOREIGN KEY (orders_id) REFERENCES orders (id)
);

-- migrate:down
DROP TABLE payment;