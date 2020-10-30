
![](https://img.shields.io/badge/made%20with-react-blue?logo=react).
<img src="https://img.shields.io/badge/react-router-blue.svg" alt="react-router">.
<img src="https://img.shields.io/badge/react-redux-blue.svg" alt="redux">.
<img src="https://img.shields.io/badge/redux-persist-blue.svg" alt="redux">.
![](https://img.shields.io/badge/made%20with-Bootstrap-blueviolet?logo=Bootstrap).
![](https://img.shields.io/badge/made%20with-mysql-blue?logo=mysql).
<br/>
![](https://img.shields.io/badge/made%20with-jsonwebtokens-orange?logo=jsonwebtokens).
![](https://img.shields.io/badge/made%20with-bcrypt-red?logo=letsencrypt).
![](https://img.shields.io/badge/made%20with-javaScript-yellow?logo=javaScript).
![](https://img.shields.io/badge/made%20with-node.js-success?logo=node.js).
<br/>
<img src="https://img.shields.io/badge/axios-succes.svg" alt="axios">.
<img src="https://img.shields.io/badge/Express-succes.svg" alt="Express">. 
<br>
<img src="https://hitcounter.pythonanywhere.com/count/tag.svg?url=https%3A%2F%2Fgithub.com%2Frevolalex%2Fmy-authetification-platform" alt="Hits">.


## Table of contents
* [App](#app)
* [SignUp](#SignUp)
* [SignIn](#SignIn)
* [General info](#general-info)
* [API](#api)
* [Front](#front)
* [Vuelidate](#vuelidate)
* [Persisted-state](#Persisted-state)
* [Token in front](#token-in-front)
* [Vuex](#vuex)
* [VueRouter](#vuerouter)
* [Technologies](#technologies)
* [Pratice](#pratice)
* [Difficulty](#Difficulty)
* [Contact](#contact)

## App
This App is an E-commerce, you can:
- signup
- signin (token)
- add a product to your cart
- add a product to sell
- visualize the product and detail
- sort the product list by categorie 
- edit your cart (qty)
- edit your profil (change email, name..)
- edit your product (change price, add promotion)
- have acces to your order history
- ....

## SignUp

<img src="https://user-images.githubusercontent.com/56839789/97727129-56665980-1ad0-11eb-8427-c59e5ec625be.gif"/>
<br/>
Handle error :

```js
var mailformat = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;
    switch (true) {
      case userObject.firstName.length < 3:
        alert("first name error: min 3 character");
        break;
      case userObject.lastName.length < 3:
        alert("last name error: min 3 character");
        break;
      case userObject.url.length < 10:
        alert("url profile picture require");
        break;
      case userObject.password < 8:
        alert("password minimun 8 character");
        break;
      case !userObject.email.match(mailformat):
        alert("email incorrect");
        break;
      case userObject.password !== this.state.confirmPassword:
        alert("confirm password error");
        break;
      default:
```

Handle if an user already use this email Back-End:

```js
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
```


## SignIn:

<img src="https://user-images.githubusercontent.com/56839789/97726932-1010fa80-1ad0-11eb-9f41-48617d8a43bf.gif"/>

Api, Back-end (token, bcrypt)
<br/>

```js
await app.post("/users/sign-in", function(req, res) {
    let password = req.body.password;
    let email = req.body.email;
    let hash = "";
    connection.query(sqlRequestUsers.mailUser, [email], function(err, results) {
      if (err) throw err;
      // handle email error
      if (!Array.isArray(results) || !results.length) {
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
  
  


