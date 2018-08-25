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

function displayAll() {
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
        searchItem();
    })
}

displayAll()

//productID("5");

function searchItem() {
    inquirer.prompt([
        {
            name: "Choices",
            message: "Retreive a product by ID"
        }
    ]).then(function(answers){
        inquirer.prompt([
            {
                name: "HowMany",
                message: "How many would you like to buy?"
            }
        ]).then(function(howManyAnswer){
            connection.query("SELECT * FROM products WHERE item_id = " + "'" + answers.Choices + "'", function(err, results) {
                if (howManyAnswer.HowMany < results[0].stock_quantity) {
                    var remainingQuantity = results[0].stock_quantity - howManyAnswer.HowMany;
                    var saleTotal = howManyAnswer.HowMany * results[0].price;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "CanYouPay",
                            message: "Your total is " + saleTotal + ", is this correct?",
                            choices: ["Yes", "No"]
                        }
                    ]).then(function(checkout){
                        if (checkout.CanYouPay === "Yes") {
                            console.log("You are the new proud owner of " + howManyAnswer.HowMany + " '" + results[0].product_name + "' shares");
                            connection.query("UPDATE products SET stock_quantity = " + remainingQuantity + " WHERE item_id = " + answers.Choices + ";");
                            setTimeout(displayAll, 2000);
                        } 
                        if (checkout.CanYouPay === "No") {
                            console.log("Join us on our next haul!");
                            setTimeout(displayAll, 2000);
                        }
                    })
                } else {
                    console.log("We do not have enough in stock, please quit and start again");
                }
            })
        })
    })
}

