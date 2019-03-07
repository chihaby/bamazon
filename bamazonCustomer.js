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
    listAllData();
    
});

// Requestins data from database table
function listAllData(){
    var query = connection.query("SELECT * FROM products", function(err, response1) {
        if (err) throw err;
        console.log(response1);
        start();
    });
    console.log(query.sql);
}

//prompt user input
function start(){
    inquirer
        .prompt([
            {
                name: "item_id",
                type: "input",
                message: "Enter the product ID, you would like to purchase"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?"
            }])
            .then(function(answer){
                var query =  connection.query("SELECT stock_quantity FROM products WHERE item_id = ?"[answer.item_id], function(err, response2) {
                    if (err) throw err;
                    for(var i=0; i<response2.length; i++){
                    console.log(response2[i]);  
                    //connection.end();
                    }               
                })
            });
    }

