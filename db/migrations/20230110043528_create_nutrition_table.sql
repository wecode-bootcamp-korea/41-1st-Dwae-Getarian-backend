-- migrate:up
CREATE TABLE `nutrition` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `kcal` DECIMAL(10, 3) NULL,
  `fat` DECIMAL(10, 3) NULL,
  `protein` DECIMAL(10, 3) NULL,
  `carbs` DECIMAL(10, 3) NULL,
  `vitamin` DECIMAL(10, 3) NULL,
  `minerals` DECIMAL(10, 3) NULL,
  `iron` DECIMAL(10, 3) NULL,
  `product_id` INT NOT NULL,
  CONSTRAINT nutrition_fk FOREIGN KEY (product_id) REFERENCES products (id)
  ON DELETE CASCADE
);

-- migrate:down
DROP TABLE nutrition;