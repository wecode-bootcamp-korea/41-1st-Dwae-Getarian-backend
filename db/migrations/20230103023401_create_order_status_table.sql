-- migrate:up
CREATE TABLE `order_status` (
  `id` INT NOT NULL PRIMARY KEY,
  `type` VARCHAR(255) NOT NULL
);

-- migrate:down
DROP TABLE order_status; 
