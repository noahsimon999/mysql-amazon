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

insert into products(product_name, department_name, price, stock_quantity)
values ("4 Vesta Share", "SpaceX Mining", 50000, 51300);

insert into products(product_name, department_name, price, stock_quantity)
values ("2 Pallas Share", "SpaceX Mining", 15000, 85000);

insert into products(product_name, department_name, price, stock_quantity)
values ("Vesta", "SpaceX Mining", 982344, 1786865);

insert into products(product_name, department_name, price, stock_quantity)
values ("3 Juno Share", "Moon Express Explorations", 68000, 24000);

insert into products(product_name, department_name, price, stock_quantity)
values ("433 Eros", "Moon Express Explorations", 72000, 22990);

insert into products(product_name, department_name, price, stock_quantity)
values ("101955 Bennu", "Moon Express Explorations", 55000, 18000);

insert into products(product_name, department_name, price, stock_quantity)
values ("951 Gaspra", "SpaceX Mining", 15000, 220000);

insert into products(product_name, department_name, price, stock_quantity)
values ("21 Lutetia", "SpaceX Mining", 125000, 10000);

insert into products(product_name, department_name, price, stock_quantity)
values ("243 Ida", "Blue Origin Mining", 1000, 12500);

insert into products(product_name, department_name, price, stock_quantity)
values ("10 Hygiea Shares", "Blue Origin Mining", 1500, 13750);

insert into products(product_name, department_name, price, stock_quantity)
values ("25143 Itokawa", "Space X Mining", 45000, 49000);

insert into products(product_name, department_name, price, stock_quantity)
values ("99942 Aprophis", "Space X Mining", 78000, 10000);

insert into products(product_name, department_name, price, stock_quantity)
values ("88 Thisbe", "Space X Mining", 42000, 15000);