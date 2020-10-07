const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require ("./modules/config")
const saltRounds = 12;

const appRouter = async function(app, connection) {
  // - POST /users/sign-up ⇒ Will add a user in the Users table (of course the
  // password will be encrypted...)
  app.post("/users/sign-up", async (req, res) => {
    let cryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    let name = req.body.name;
    let nameFirstLetterCapitalize =
      name.charAt(0).toUpperCase() + name.slice(1);
    let addUser = "INSERT INTO users (name,email,password) VALUES (?)";
    let user = [
      nameFirstLetterCapitalize,
      req.body.email.toLowerCase(),
      cryptedPassword,
    ];
    connection.query(addUser, [user], (err) => {
      if (err) throw err;
      res.status(201).send(`Utilisateur enregistré: ${req.body.name}`);
    });
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




};
module.exports = appRouter;

// - POST /users/sign-in ⇒ Will check whether the password is the good one for
// this specific email. If so it will deliver a JWT including Email and Id of this User.
//  - GET /users/:id ⇒ Return all the datas of this specific User (including the name of the products he created...)
