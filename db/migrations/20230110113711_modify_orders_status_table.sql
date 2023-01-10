-- migrate:up
ALTER TABLE `order_product` DROP FOREIGN KEY order_product_order_status_fk;
ALTER TABLE `order_status` MODIFY `id` INT NOT NULL AUTO_INCREMENT;
ALTER TABLE `order_product` ADD CONSTRAINT order_product_order_status_fk FOREIGN KEY (order_status_id)
REFERENCES order_status (id) ON DELETE CASCADE;
-- migrate:down

