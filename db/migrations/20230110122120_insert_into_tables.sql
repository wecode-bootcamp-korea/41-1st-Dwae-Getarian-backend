-- migrate:up
INSERT INTO gender (gender_orientation) VALUES ("Male"), ("Female"), ("Others"), ("Them/They");
INSERT INTO categories (name) VALUES ("Vegetarian"), ("Ovo"), ("Lacto"), ("Lacto-Ovo"), ("Pescatarian");
INSERT INTO order_status (type) VALUES ("PENDING"), ("PREPARING"), ("DELIVERING"), ("DELIVERED");

-- migrate:down

