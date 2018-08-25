CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int auto_increment NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price integer(100) NOT NULL,
  stock_quantity integer(100) NOT NULL,
  PRIMARY KEY (item_id)
);