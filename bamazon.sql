DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    item_id VARCHAR(10),
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER(6),
    stock_quantity INTEGER(6),
    PRIMARY KEY (id)
);

SELECT * FROM bamazon_db.products;

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES ("C1", "Jeans", "Bottoms", 40, 100),
        ("C2", "Nikes", "Footwear", 100, 20),
        ("C3", "Coat", "Outrwear", 60, 30),
        ("C4", "Tshirt", "Tops", 20, 40),
        ("C5", "Hat", "Accesories", 25, 30),
        ("C6", "Sweaters", "Tops", 30, 10),
        ("C7", "Sandals", "Footwear", 20, 5),
        ("C8", "Shorts", "Swimwear", 25, 30),
        ("C9", "Sunglasses", "Eyewear", 25, 20),
        ("C10", "Watches", "Accesories", 40, 10);
        
SELECT * FROM bamazon_db.products;
    
    
    