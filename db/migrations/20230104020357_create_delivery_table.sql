-- migrate:up
CREATE TABLE delevery_address (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `orders_id` INT NOT NULL,
  `address` VARCHAR(1000) NOT NULL,
  `phone_number` INT NOT NULL,
  CONSTRAINT address_delivery_fk FOREIGN KEY (orders_id) REFERENCES orders (id),
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE delivery_address;
