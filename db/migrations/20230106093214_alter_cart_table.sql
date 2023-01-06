-- migrate:up
ALTER TABLE cart ADD UNIQUE KEY (cart.user_id, cart.product_id);

-- migrate:down

