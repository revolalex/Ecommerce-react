const sqlRequestProduct = require("../sql/sqlProduct");

const auth = require("../middleware/auth");

const appRouterProduct = async function(app, connection) {
  //   GET /products/ ⇒ Return the list of registered products (return only Names and Ids, Prices)
  await app.get("/products/", function(req, res) {
    // let getProductsInfo = "SELECT * FROM products";
    connection.query(sqlRequestProduct.getProductsInfo, function(err, results) {
      results.forEach((element) => {
        element.url = element.url.split(",");
      });
      if (err) throw err;
      res.send(results);
    });
  });

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

    connection.query(sqlRequestProduct.postProduct, productObject, function(
      err,
      results
    ) {
      if (err) throw err;
      res.send(results);
    });
  });

  //GET /products/:id ⇒ Return all the datas of this specific Product
  //(including the name of the user who created it, the category, the description etc...)
  await app.get("/products/:id", function(req, res) {
    let id = req.params.id;
    connection.query(sqlRequestProduct.productInfo(id), function(err, results) {
      results.forEach((element) => {
        element.url = element.url.split(",");
      });
      if (err) throw err;
      res.send(results);
    });
  });

  await app.get("/productid/:id", function(req, res) {
    let id = req.params.id;
    connection.query(
      sqlRequestProduct.poductInfoWithIdUserAffiliate(id),
      function(err, results) {
        if (err) throw err;
        res.send(results);
      }
    );
  });

  // POST /product/:id => Delete this specific product from the database
  await app.post("/product/:id", auth, (req, res) => {
    connection.query(sqlRequestProduct.deleteProduct(req.params.id), (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else res.send("Deleted");
    });
  });

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
};
module.exports = appRouterProduct;
