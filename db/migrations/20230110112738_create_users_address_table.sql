-- migrate:up
CREATE TABLE `delivery_address` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`orders_id` INT NOT NULL,
`address` VARCHAR(200) NOT NULL,
`phone_number` VARCHAR(50) NOT NULL,
CONSTRAINT delivery_address_fk FOREIGN KEY (orders_id) REFERENCES orders (id)
ON DELETE CASCADE
);

-- migrate:down
DROP TABLE delivery_address
