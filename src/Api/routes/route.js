const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./modules/config");
const saltRounds = 12;
const auth = require("../middleware/auth");

const appRouter = async function(app, connection) {
  /**************************** API USER ***************************************/
  /*****************************************************************************/

  /*********************** Check if user with this email already exist *************************/
  await app.use("/users/sign-up", (req, res, next) => {
    console.log(req.body.email);
    connection.query(
      `SELECT * FROM users WHERE email = '${req.body.email}'`,
      (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          res.status(200).send("this EMAIL already exist");
        } else {
          next();
        }
      }
    );
  });

  // - POST /users/sign-up ⇒ Will add a user in the Users table (of course the
  // password will be encrypted...)
  await app.post("/users/sign-up", (req, res) => {
    let password = req.body.password;
    let lastName = req.body.lastName;
    let firstName = req.body.firstName;
    let url = req.body.url;

    if (
      password.length &&
      lastName.length &&
      firstName.length &&
      url.length > 0
    ) {
      let capitalLastName =
        lastName.charAt(0).toUpperCase() + lastName.slice(1);
      let capitalFirstName =
        firstName.charAt(0).toUpperCase() + firstName.slice(1);
      // Crypt the password
      let cryptedPassword = bcrypt.hashSync(password, saltRounds);

      let addUser =
        "INSERT INTO users (firstName,lastName,url,email,password) VALUES (?)";
      let user = [
        capitalFirstName,
        capitalLastName,
        url,
        req.body.email.toLowerCase(),
        cryptedPassword,
      ];
      connection.query(addUser, [user], (err) => {
        if (err) throw err;
        res.status(201).send(`Utilisateur enregistré`);
      });
    } else {
      res.send("error");
    }
  });

  // GET /users/ ⇒ Return the list of registered users (return only Names and Ids)
  await app.get("/users", function(req, res) {
    let getUserInfo = "SELECT name, id FROM users";
    connection.query(getUserInfo, function(err, results) {
      console.log(err);
      if (err) throw err;
      res.send(results);
    });
  });

  // Get all users with all info
  await app.get("/allUsers", function(req, res) {
    let getUserInfo = "SELECT id,firstName,lastName,url,email FROM users";
    connection.query(getUserInfo, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // - POST /users/sign-in ⇒ Will check whether the password is the good one for
  // this specific email. If so it will deliver a JWT including Email and Id of this User.
  await app.post("/users/sign-in", function(req, res) {
    let password = req.body.password;
    let email = req.body.email;
    let mailUser = "SELECT * FROM users WHERE email = ?";
    let hash = "";

    connection.query(mailUser, [email], function(err, results) {
      if (err) throw err;
      // handle email error
      if (!Array.isArray(results) || !results.length) {
        // res.status(401).send("Sorry, email incorrect");
        res.send("Sorry, email incorrect");
      } else {
        let name = results[0].name;
        let id = results[0].id;
        /******* TOKEN *******/
        let token = jwt.sign(
          { email: email, name: name, id: id },
          config.secret
        );
        hash = results[0].password;
        // handle password error
        bcrypt.compare(password, hash, function(err, result) {
          if (result == true) {
            // get the decoded payload ignoring signature, no secretOrPrivateKey needed
            var decoded = jwt.decode(token);
            // get the decoded payload and header
            var decoded = jwt.decode(token, { complete: true });
            res.status(200).send({
              auth: true,
              token: token,
              email: email,
              id: id,
            });
          } else {
            res.send("password error");
          }
        });
      }
    });
  });

  // - GET /users/:id ⇒ Return all the datas of this specific User (including the name of the products he created...)
  await app.get("/users/:id", function(req, res) {
    let id = req.params.id;
    let getUserInfo = `SELECT * FROM users where id = ${id};`;
    connection.query(getUserInfo, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  /**************************** API PRODUCTS ***********************************/
  /*****************************************************************************/

  //   GET /products/ ⇒ Return the list of registered products (return only Names and Ids, Prices)
  await app.get("/products/", function(req, res) {
    let getProductsInfo = "SELECT * FROM products";
    connection.query(getProductsInfo, function(err, results) {
      results.forEach((element) => {
        element.url = element.url.split(",");
      });
      if (err) throw err;
      res.send(results);
    });
  });

  // POST /products/ ⇒ Will add a product in the Products table (only if the user who create the product has a good JWT...)
  // POST /products/ ⇒ Will add a product in the Products table (only if the user who create the product has a good JWT...)
  await app.post("/products/", auth, function(req, res) {
    let category = req.body.category;
    let prices = req.body.prices;
    let name = req.body.name;
    let description = req.body.description;
    let url = "";
    let id_user_affiliate = req.body.id_user_affiliate;

    for (let i = 0; i < req.body.url.length; i++) {
      if (i === 0) {
         url = req.body.url[i];
      } else {
        url = url + "," + req.body.url[i];
      }
    }

    const productObject = {
      category: category,
      name: name,
      description: description,
      url: url,
      prices: prices,
      id_user_affiliate: id_user_affiliate,
    };

    let postProduct = "INSERT INTO products SET ?";

    connection.query(postProduct, productObject, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  //GET /products/:id ⇒ Return all the datas of this specific Product
  //(including the name of the user who created it, the category, the description etc...)
  await app.get("/products/:id", function(req, res) {
    let id = req.params.id;
    let productInfo = `SELECT users.lastName,users.firstName,products.id, products.name, products.category, products.description, products.prices, products.url, products.promotion, products.promotionIsActive
    FROM users INNER JOIN products ON products.id = ${id} && products.id_user_affiliate = users.id`;

    connection.query(productInfo, function(err, results) {
      results.forEach((element) => {
        element.url = element.url.split(",");
      });
      if (err) throw err;
      res.send(results);
    });
  });

  await app.get("/productid/:id", function(req, res) {
    let id = req.params.id;
    let productInfo = `SELECT * FROM products where id_user_affiliate = ${id};`;

    connection.query(productInfo, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });

  // POST /product/:id => Delete this specific product from the database
  await app.post("/product/:id", auth, (req, res) => {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;
    connection.query(sql, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else res.send("Deleted");
    });
  });

  // POST /productEdit/:id => Update this specific product from the database
  await app.post("/productEdit/:id", auth, (req, res) => {
    if (req.body.idUser === req.body.id_user_affiliate) {
      let sql = `UPDATE products  SET category = '${req.body.category
        .charAt(0)
        .toUpperCase() +
        req.body.category.slice(1)}', name = '${req.body.name
        .charAt(0)
        .toUpperCase() + req.body.name.slice(1)}', description = "${
        req.body.description
      }", prices = '${req.body.prices}',url = '${req.body.url}',promotion = '${
        req.body.promotion
      }', promotionIsActive = '${req.body.promotionIsActive}' WHERE id = ${
        req.params.id
      }`;
      connection.query(sql, (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else res.send("Updated");
      });
    }
  });

  // POST /  Edit an user information
  await app.post("/userEdit/:id", auth, (req, res) => {
    if (typeof JSON.parse(req.params.id) === "number") {
      if (
        req.body.password.length &&
        req.body.lastName.length &&
        req.body.firstName.length &&
        req.body.url.length > 0
      ) {
        const cryptedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        const capitalLastName =
          req.body.lastName.charAt(0).toUpperCase() +
          req.body.lastName.slice(1);
        const capitalFirstName =
          req.body.firstName.charAt(0).toUpperCase() +
          req.body.firstName.slice(1);
        const sql = `UPDATE users SET firstname = '${capitalFirstName}', lastName = '${capitalLastName}', url = '${req.body.url}', email = '${req.body.email}', password = '${cryptedPassword}' WHERE id = ${req.params.id}`;
        connection.query(sql, (err) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
          } else res.send("Updated");
        });
      } else {
        res.send("Field incorrects");
      }
    } else {
      res.send("Id incorrect");
    }
  });

  /**************************** API BASKET ***********************************/
  /*****************************************************************************/

  /*Get / Get All Order History where id_user_affiliate = */
  await app.get("/basketHistory/:id", (req, res) => {
    let getHistory = `SELECT * FROM basket where id_user_affiliate = ${req.params.id};`;
    connection.query(getHistory, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  // Post / post the basket in the db
  await app.post("/panier/", (req, res) => {
    /**
     * HERE
     */
    // to do: date in db and insert it
    const event = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log(event.toLocaleDateString("fr-FR", options));

    let sql =
      "INSERT INTO basket (category,name,description,prices,url,quantity,id_product,id_user_affiliate,promotion, promotionIsActive) VALUES (?)";
    for (i = 0; i < req.body.length; i++) {
      let product = [
        req.body[i].category,
        req.body[i].name,
        req.body[i].description,
        req.body[i].prices,
        req.body[i].url,
        req.body[i].quantity,
        req.body[i].id,
        req.body[i].id_user_affiliate,
        req.body[i].promotion,
        req.body[i].promotionIsActive,
      ];
      connection.query(sql, [product], (err) => {
        if (err) console.log(err);
      });
    }
    res.send("Stockés");
  });
};
module.exports = appRouter;
