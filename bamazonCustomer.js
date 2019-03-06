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
    const query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res[0].stock_quantity);
        start();
       // connection.end();
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
                const query = connection.query("SELECT * FROM products", function(err, res) {
                    if (err) throw err;
                    // console.log(res[1].stock_quantity);
                    var arr = [];
                for (var i=0; i<res.length; i++){
                    if (res[i].item_id == answer.item_id){
                        arr.push(res[i]);
                        console.log(arr);
                    }
                }
                connection.end();
            })
    })
}
