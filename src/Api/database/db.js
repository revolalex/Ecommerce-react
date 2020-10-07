const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:'3308',
    database: 'ecomreact'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to DB");
    // create table users
    let createTableColUsers =
      "CREATE TABLE IF NOT EXISTS users ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(200) NOT NULL, password VARCHAR(200) NOT NULL)";
    connection.query(createTableColUsers, function(err, results) {
      if (err) throw err;
    });
    // create table contacts
    let createTableColContacts =
      "CREATE TABLE IF NOT EXISTS products ( id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, category VARCHAR(30) NOT NULL,name VARCHAR(30) NOT NULL, description VARCHAR(200) NOT NULL, price VARCHAR(50) NOT NULL, id_affiliate INT NOT NULL)";
    connection.query(createTableColContacts, function(err, results) {
      if (err) throw err;
    });
  });