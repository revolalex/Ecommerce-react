const sqlRequestBasket = require("../sql/sqlBasket");
const auth = require("../middleware/auth");

const appRouterbasket = async function(app, connection) {
  /*Get / Get All Order History where id_user_affiliate = */
  await app.get("/basketHistory/:id", (req, res) => {
    connection.query(sqlRequestBasket.getHistory(req.params.id), (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });

  // Post / post the basket in the db
  await app.post("/panier/", (req, res) => {
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
      connection.query(sqlRequestBasket.postBasket, [product], (err) => {
        if (err) console.log(err);
      });
    }
    res.send("Stockés");
  });
};
module.exports = appRouterbasket;