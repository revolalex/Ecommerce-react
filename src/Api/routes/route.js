const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./modules/config");
const saltRounds = 12;
const auth = require("../middleware/auth");

const appRouter = async function(app, connection) {
  /**************************** API USER ***************************************/

  /*****************************************************************************/

  // await app.post("/users/sign-up", function(req, res) {
  //   let password = req.body.password;
  //   let lastName = req.body.lastName;
  //   let firstName = req.body.firstName;
  //   let url = req.body.url;
  //   if (password.length < 0) {
  //     if (lastName.length < 0) {
  //       if (firstName.length < 0) {
  //         if (url.length < 0) {
  //           let capitalLastName =
  //             lastName.charAt(0).toUpperCase() + lastName.slice(1);
  //           let capitalFirstName =
  //             firstName.charAt(0).toUpperCase() + firstName.slice(1);

  //           let cryptedPassword = bcrypt.hashSync(password, saltRounds);

  //           let addUser =
  //             "INSERT INTO users (firstName,lastName,url,email,password) VALUES (?)";
  //           let user = [
  //             capitalFirstName,
  //             capitalLastName,
  //             url,
  //             req.body.email.toLowerCase(),
  //             cryptedPassword,
  //           ];
  //           connection.query(addUser, [user], (err) => {
  //             if (err) throw err;
  //             res
  //               .status(201)
  //               .send(`Utilisateur enregistré: ${req.body.firstName}`);
  //           });
  //         } else {
  //           console.log("url error");
  //         }
  //       } else {
  //         console.log("first name error");
  //       }
  //     } else {
  //       console.log("last Name Error");
  //     }
  //   } else {
  //     console.log("password Error");
  //   }
  // });

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
      console.log(user);
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
    let getUserInfo = "SELECT * FROM users";
    connection.query(getUserInfo, function(err, results) {
      console.log(err);
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
      console.log("result sign-in ==>", results);
      // handle email error
      if (!Array.isArray(results) || !results.length) {
        console.log("email error");
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
            console.log("header ==>", decoded.header);
            console.log("payload ==>", decoded.payload);
            res.status(200).send({
              auth: true,
              token: token,
              email: email,
              id: id,
            });
          } else {
            console.log("pass error");
            res.send("password error");
          }
        });
      }
    });
  });

  //   to be continued
  // - GET /users/:id ⇒ Return all the datas of this specific User (including the name of the products he created...)
  await app.get("/users/:id", function(req, res) {
    let id = req.params.id;
    let getUserInfo = `SELECT * FROM ecomreact.users where id = ${id};`;
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
      if (err) throw err;
      res.send(results);
    });
  });

  // must add middleware for jwt allow acces
  // POST /products/ ⇒ Will add a product in the Products table (only if the user who create the product has a good JWT...)
  await app.post("/products/",auth, function(req, res) {
    let category = req.body.category;
    let prices = req.body.prices;
    let name = req.body.name;
    let description = req.body.description;
    let url = req.body.url;
    let id_user_affiliate = req.body.id_user_affiliate;

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
    let productInfo = `SELECT users.name AS username, products.name, products.category, products.description, products.prices 
    FROM users INNER JOIN products ON products.id_user_affiliate = ${id} `;

    connection.query(productInfo, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
};
module.exports = appRouter;
