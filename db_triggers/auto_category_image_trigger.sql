DELIMITER $$

CREATE TRIGGER before_product_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
    IF NEW.category IS NULL OR NEW.category = '' THEN
        IF LOWER(NEW.name) LIKE '%tomato%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'tomato.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%potato%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'potato.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%cucumber%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'cucumber.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%apple%' THEN
            SET NEW.category = 'Fruit';
            SET NEW.image_url = 'apple.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%carrot%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'carrot.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%ladys finger%' OR LOWER(NEW.name) LIKE '%okra%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'ladys finger.jpg';
        ELSE
            SET NEW.category = 'Other';
            SET NEW.image_url = 'default.jpg';
        END IF;
    END IF;
END$$

CREATE TRIGGER before_product_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
    IF NEW.category IS NULL OR NEW.category = '' THEN
        IF LOWER(NEW.name) LIKE '%tomato%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'tomato.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%potato%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'potato.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%cucumber%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'cucumber.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%apple%' THEN
            SET NEW.category = 'Fruit';
            SET NEW.image_url = 'apple.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%carrot%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'carrot.jpg';
        ELSEIF LOWER(NEW.name) LIKE '%ladys finger%' OR LOWER(NEW.name) LIKE '%okra%' THEN
            SET NEW.category = 'Vegetable';
            SET NEW.image_url = 'ladys finger.jpg';
        ELSE
            SET NEW.category = 'Other';
            SET NEW.image_url = 'default.jpg';
        END IF;
    END IF;
END$$

DELIMITER ;
