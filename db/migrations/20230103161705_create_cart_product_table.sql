-- migrate:up
CREATE TABLE cart_product (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    CONSTRAINT cart_product_user_fk FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT cart_product_product_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down

