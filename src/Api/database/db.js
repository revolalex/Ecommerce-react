var mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "alexandre",
  database: "ecomreact",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to DB");

  let createDB = "CREATE database IF NOT EXISTS ecomreact";
  connection.query(createDB, function(err, results) {
    if (err) throw err;
  });

  let userTable =
    "CREATE TABLE IF NOT EXISTS users ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(30) NOT NULL, lastName VARCHAR(30) NOT NULL, url VARCHAR(200) NOT NULL, email VARCHAR(200) NOT NULL, password VARCHAR(200) NOT NULL)";
  connection.query(userTable, function(err, results) {
    if (err) throw err;
  });

  let productTable =
    "CREATE TABLE IF NOT EXISTS products ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, category VARCHAR(30) NOT NULL, name VARCHAR(200) NOT NULL, description VARCHAR(500) NOT NULL, prices FLOAT(10) NOT NULL, url VARCHAR(200) NOT NULL, id_user_affiliate INT(10))";
  connection.query(productTable, function(err, results) {
    if (err) throw err;
  });
});

module.exports = connection;
