-- migrate:up
CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `thumbnail_image` VARCHAR(1000) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `price` DECIMAL(10, 3) NOT NULL,
  `total_quantity` INT NULL,
  `co2` INT NULL,
  `category_id` INT NOT NULL,
	`is_mealkit` BOOLEAN NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT products_fk FOREIGN KEY (category_id) REFERENCES categories (id)
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE products;
