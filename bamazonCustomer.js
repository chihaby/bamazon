var mysql = require("mysql");
var inquirer = require("inquirer");

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

function listAllData(){
    const query = connection.query("SELECT * FROM products", function(err, response1) {
        if (err) throw err;
        console.log(response1);
        start();
    });
    console.log(query.sql);
}

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
                const query = connection.query("SELECT * FROM products", function(err, response2) {
                    if (err) throw err;
                    response2.forEach(element => {
                        //var chosenItem = [];
                        if (element.item_id === answer.item_id){
                            //chosenItem.push(element.item_id);
                            console.log(element.item_id);
                            //return chosenItem;
                            connection.end();
                    }                   
                });  
                
            })
    })
}
