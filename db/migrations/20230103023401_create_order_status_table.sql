-- migrate:up
CREATE TABLE `order_status` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(255) NOT NULL DEFAULT "PENDING"
);

-- migrate:down
DROP TABLE order_status; 
