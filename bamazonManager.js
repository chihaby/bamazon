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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    menu();
});


//Menu selection
function menu (){
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Select from the following: ",
            choices: ["VIEW PRODUCTS", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
        })
        .then(function(answer) {

            if (answer.menu === "VIEW PRODUCTS") {
                viewProducts();
            }
            else if(answer.menu === "VIEW LOW INVENTORY") {
                viewLowInventory();
            }
            else if(answer.menu === "ADD TO INVENTORY") {
                addToInventory();
            }
            else if(answer.menu === "ADD NEW PRODUCT") {
                addNewProduct();
            }else{
            connection.end();
            }
        });
}



