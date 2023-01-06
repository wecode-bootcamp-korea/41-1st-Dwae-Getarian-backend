-- migrate:up
ALTER TABLE cart ADD UNIQUE KEY (user_id, product_id);

-- migrate:down

