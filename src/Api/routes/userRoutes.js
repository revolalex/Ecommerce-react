const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./modules/config");
const saltRounds = 12;
const sqlRequestUsers = require("../sql/sqlUsers");

const appRouterUser = async function(app, connection) {
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

      let user = [
        capitalFirstName,
        capitalLastName,
        url,
        req.body.email.toLowerCase(),
        cryptedPassword,
      ];
      connection.query(sqlRequestUsers.addUser, [user], (err) => {
        if (err) throw err;
        res.status(201).send(`Utilisateur enregistré`);
      });
    } else {
      res.send("error");
    }
  });
  // GET /users/ ⇒ Return the list of registered users (return only Names and Ids)
  await app.get("/users", function(req, res) {
    connection.query(sqlRequestUsers.getUserInfo, function(err, results) {
      console.log(err);
      if (err) throw err;
      res.send(results);
    });
  });
  // Get all users with all info
  await app.get("/allUsers", function(req, res) {
    connection.query(sqlRequestUsers.getUsersInfo, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
  // - POST /users/sign-in ⇒ Will check whether the password is the good one for
  // this specific email. If so it will deliver a JWT including Email and Id of this User.
  await app.post("/users/sign-in", function(req, res) {
    let password = req.body.password;
    let email = req.body.email;
    let hash = "";

    connection.query(sqlRequestUsers.mailUser, [email], function(err, results) {
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
    connection.query(sqlRequestUsers.getUserInfoData, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
  });
};
module.exports = appRouterUser;
