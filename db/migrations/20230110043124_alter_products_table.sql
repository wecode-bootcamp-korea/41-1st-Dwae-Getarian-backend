-- migrate:up
ALTER TABLE products
ADD `is_mealkiet` BOOLEAN NOT NULL;

-- migrate:down

