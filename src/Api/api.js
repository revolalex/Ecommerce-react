/************************** Module ****************************/
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");

/************************** MidlleWare ****************************/
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // token header
  res.header("Access-Control-Request-Headers: Authorization");
  next();
};
app.use(allowCrossDomain);

/************************** connection mysql ****************************/
const connection = require("./database/db");
connection.connect();

/************************** Routes ****************************/
require("./routes/route")(app, connection);

//connection.end();

app.listen(8080, function() {
  console.log("server listening on: http://localhost:8080/");
});
