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
                var query =  connection.query(`SELECT * FROM products WHERE item_id = "${answer.item_id}"`, function(err, response2) {
                    if (err) throw err;
                    for(var i=0; i<response2.length; i++){

                        console.log(response2[i]); 
                        console.log("===============================");    
                        console.log("Quantity In Stock: " + response2[i].stock_quantity);
                        console.log("==============================="); 
                        //add quantity ordered;

                        console.log("===============================");    
                        console.log("Quantity Ordered: " + answer.quantity);
                        console.log("==============================="); 

                    
                    if(response2[i].stock_quantity <= 0){
                        console.log("*******ITEM OUT OF STOCK*******"); 
                        } 

                    else if (answer.quantity > response2[i].stock_quantity){
                        console.log("Insufficient quantity! There are only "+ response2[i].stock_quantity + " Units available" );
                    }

                    connection.query(`UPDATE products SET stock_quantity = "${response2[i].stock_quantity}" - "${answer.quantity}" WHERE item_id = "${answer.item_id}" `);
                    connection.query(`SELECT * FROM products WHERE item_id = "${answer.item_id}"`, function(err, response3) {
                    for (var i=0; i<response3.length; i++){

                        console.log("===============================");    
                        console.log("Updated Quantity: " + response3[i].stock_quantity);
                        console.log("===============================");   
                        
                        console.log("===============================");    
                        console.log("Total Amount: $" + response3[i].price * answer.quantity);
                        console.log("===============================");   

                            if(response3[i].stock_quantity <= 0){
                                console.log("*******ITEM OUT OF STOCK*******");                                
                                } 

                                connection.end();      
                        }
                    })             
                }
            })
        })
    }