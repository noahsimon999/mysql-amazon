var mysql = require("mysql");
var inquirer = require("inquirer");

require ("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "bamazon"
});

connection.connect((err) => {
    if (err) throw err;
});


function manager() {
    inquirer.prompt([
        {
            type: "list",
            name: "managerOptions",
            message: "Here are your manager options: ",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(answers){
        if(answers.managerOptions === "View Products for Sale") {
            connection.query("SELECT * FROM products", (err, results) => {
                for(var i in results) {
                    console.log("\n==============================================");
                    console.log("ID: " + results[i].item_id);
                    console.log("Name: " + results[i].product_name);
                    console.log("Mining Company: " + results[i].department_name);
                    console.log("Price: $" + results[i].price);
                    console.log("Quantity: " + results[i].stock_quantity);
                    console.log("\n==============================================");
                }
                manager()
            })
        }
        if(answers.managerOptions === "View Low Inventory") {
            connection.query("SELECT * FROM products", (err, results) => {
                for(var i in results) {
                    if (results[i].stock_quantity <= 5) {
                        console.log("\n==============================================");
                        console.log("ID: " + results[i].item_id);
                        console.log("Name: " + results[i].product_name);
                        console.log("Mining Company: " + results[i].department_name);
                        console.log("Price: $" + results[i].price);
                        console.log("Quantity: " + results[i].stock_quantity);
                        console.log("\n==============================================");
                    }
                }
                console.log("\n==============================================");
                console.log("Nothing is low");
                console.log("\n==============================================");
                manager()
            })
        }
        if(answers.managerOptions === "Add to Inventory") {
            inquirer.prompt([
                {
                    name: "chooseID",
                    message: "Please choose an ID to add inventory to"
                },
                {
                    name: "chooseAmount",
                    message: "Please enter a quantity to add to your inventory"
                },
            ]).then(function(inventoryChange){
                connection.query("SELECT * FROM products WHERE item_id = " + "'" + inventoryChange.chooseID + "'", function(err, results) {
                    var total = parseInt(results[0].stock_quantity) + parseInt(inventoryChange.chooseAmount);
                    connection.query("UPDATE products SET stock_quantity = " + total + " WHERE item_id = " + inventoryChange.chooseID + ";");
                        connection.query("SELECT * FROM products WHERE item_id = " + "'" + inventoryChange.chooseID + "'", function(err, newResults) {
                            console.log("\n==============================================");
                            console.log("NEW QUANTITY");
                            console.log("\n==============================================");
                            console.log("ID: " + newResults[0].item_id);
                            console.log("Name: " + newResults[0].product_name);
                            console.log("Mining Company: " + newResults[0].department_name);
                            console.log("Price: $" + newResults[0].price);
                            console.log("Quantity: " + newResults[0].stock_quantity);
                            console.log("\n==============================================");
                        });
                });
            })
            
        }
        if(answers.managerOptions === "Add New Product") {
            console.log("\n==============================================");
            console.log("ADD A PRODUCT WIZARD");
            console.log("\n==============================================");
            inquirer.prompt([
                {
                    name: "enterName",
                    message: "Please enter the product name"
                },
                {
                    name: "enterCompany",
                    message: "Please enter mining company name"
                },
                {
                    name: "enterPrice",
                    message: "Please enter the price"
                },
                {
                    name: "enterQuantity",
                    message: "Please enter a quantity to add to your inventory"
                }
            ]).then(function(newProductData) {
                connection.query("insert into products(product_name, department_name, price, stock_quantity) values ('" + newProductData.enterName + "', '" + newProductData.enterCompany + "', " + newProductData.enterPrice + ", " + newProductData.enterQuantity + ")", function(err, results) {
                    console.log("Thank you for adding a new astroid");
                    manager();
                })
            })
        }
    })
}

manager();