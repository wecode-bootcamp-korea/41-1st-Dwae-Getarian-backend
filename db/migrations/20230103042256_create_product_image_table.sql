-- migrate:up
CREATE TABLE `product_images` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `img_url` VARCHAR(255) NULL,
  `product_id` INT NOT NULL,
  CONSTRAINT product_imgages_fk FOREIGN KEY (product_id) REFERENCES products (id) 
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE product_images; 
