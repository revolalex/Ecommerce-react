class sqlRequestBasket {
  static getHistory(id) {
    return `SELECT * FROM basket where id_user_affiliate = ${id};`;
  }
  static postBasket =
  "INSERT INTO basket (category,name,description,prices,url,quantity,id_product,id_user_affiliate,promotion, promotionIsActive) VALUES (?)";
}
module.exports = sqlRequestBasket;
