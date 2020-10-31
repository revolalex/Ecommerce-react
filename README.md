
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
* [Techno](#techno)
* [App](#app)
* [Signup](#Signup)
* [Signin](#Signin)
* [Create product](#create-product)
* [Products list](#products-list)
* [Product detail](#product-detail)
* [Contact](#contact)

## Techno

#### Back-End
- node.js
- express
- bcrypt
- jwt (jsonwebtoken)

#### DataBase:
 - mysql


#### Front-End
- react
- react-context-devtool
- react-router
- redux
- redux-persist
- axios
- boostrap


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

## Signup

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


## Signin:

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
  ```
  
## Create Product
<img src="https://user-images.githubusercontent.com/56839789/97734940-0e4c3480-1ada-11eb-95d1-58dcbb315939.gif"/>

### handle error:
```js
switch (true) {
      case productObject.category.length < 2:
        alert("category error: min 2 characters");
        break;
      case productObject.name.length < 3:
        alert("name error: min 3 characters");
        break;
      case productObject.description.length < 10:
        alert("description required min 10 characters");
        break;
      case productObject.url.length < 1:
        alert("url of product picture required min 10 characters");
        break;
      case productObject.prices.length < 1:
        alert("Price missing");
        break;
      default:
```


### header with token:
i store it in the state 
```js
headerWithToken: {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      },
```
### request with token in the header:
```js
axios.post("http://localhost:8080/products/",productObject,this.state.headerWithToken)
```

### Middleware check token API Back-end:

```js
const jwt = require('jsonwebtoken');
const config = require("../routes/modules/config");

module.exports  = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.secret);
    if (decodedToken) {
      next();
    } else {
      res.sendStatus(403)
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
```

Import the middleware:
<br/>
```js
const auth = require("../middleware/auth");
```

Example of use:
```js
  // POST /productEdit/:id => Update this specific product from the database
  await app.post("/productEdit/:id", auth, (req, res) => {
    req.body.id = req.params.id;
    if (req.body.idUser === req.body.id_user_affiliate) {
      connection.query(sqlRequestProduct.editProduct(req.body), (err) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else res.send("Updated");
      });
    }
  });
```

  
## Products List

<img src="https://user-images.githubusercontent.com/56839789/97735327-7864d980-1ada-11eb-83e0-ead9d3b6745a.gif"/>

#### Get all the product:
```js
 componentDidMount() {
    axios
      .get(`http://localhost:8080/products/`)
      .then((result) => {
        this.props.setListOfProducts(result.data);
      })
      .catch(() => {
        console.log("Oops, request failed!");
      });
  }
```

## Product detail
<img src="https://user-images.githubusercontent.com/56839789/97783238-b0315700-1b96-11eb-8ed2-475607acac7a.gif"/>

## Basket
<img src="https://user-images.githubusercontent.com/56839789/97783181-5d579f80-1b96-11eb-907a-7105da882602.gif"/>

## Status
Project is:  _Finish_


## Contact	
- [![LinkedIn][linkedin-shield]][linkedin-url] 	
- revolalex@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandre-rodrigueza/


