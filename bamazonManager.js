var mysql = require("mysql");
var inquirer = require("inquirer");

// setup MySQL connection 
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    menu();
});


//Menu selection
function menu() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Select from the following: ",
            choices: ["VIEW PRODUCTS", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
        })
        .then(function (answer) {

            if (answer.menu === "VIEW PRODUCTS") {
                product();
            }
            else if (answer.menu === "VIEW LOW INVENTORY") {
                lowInventory();
            }
            else if (answer.menu === "ADD TO INVENTORY") {
                addInventory();
            }
            else if (answer.menu === "ADD NEW PRODUCT") {
                addProduct();
            } else {
                connection.end();
            }
        });
}

function product() {
    var query = connection.query("SELECT * FROM products", function (err, response1) {
        if (err) throw err;
        console.log(response1);
    })
    console.log(query.sql);
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, response2) {
        if (err) throw err;
        console.log(response2);
    })
    connection.end();
}

function addInventory() {

    inquirer.prompt([
        {
            name: 'item_id',
            type: "input",
            message: "Which item would you like to add to Inventory?"
        },
        {
            name: 'quantity',
            type: "input",
            message: "How many items are you adding?"
        }
    ]).then(function (answer) {
        connection.query(`
            UPDATE products
            SET stock_quantity = stock_quantity + ${answer.quantity}
            WHERE item_id = ${answer.item_id}`,
            function (err, response3) {
                if (err) throw err;

                for (var i = 0; i < response3.length; i++) {
                    console.log("===============================================");
                    console.log(answer.quantity + " New items added to: " + answer.item_id);
                    console.log("New Inventory" + answer.item_id + " = " + response3[i].stock_quantity + answer.quantity);
                    console.log("================================================");

                    console.log("===============================");
                    console.log("Updated Quantity: " + response3[i].stock_quantity);
                    console.log("===============================");

                    connection.end();
                }
            })
    })
}

function addProduct() {
    inquirer.prompt([
        {
            name: 'item_id',
            type: "input",
            message: "Item ID"
        },
        {
            name: 'product_name',
            type: "input",
            message: "Product name"
        },
        {
            name: 'department_name',
            type: "input",
            message: "Department"
        },
        {
            name: 'price',
            type: "input",
            message: "Price"
        },
        {
            name: 'quantity',
            type: "input",
            message: "Quantity"
        }
    ]).then(function (answer) {
        connection.query(`
            INSERT INTO products (item_id, product_name, department_name, price, stock_quantity),
            VALUES
                ("${answer.item_id}', '${answer.product_name}', '${answer.department_name}', ${answer.price}, ${answer.quantity})`);
    })
}