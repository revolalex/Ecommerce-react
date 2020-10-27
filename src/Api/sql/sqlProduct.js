class sqlRequestProduct {
  static getProductsInfo = "SELECT * FROM products";
  static postProduct = "INSERT INTO products SET ?";

  static productInfo(id) {
    return `SELECT users.lastName,users.firstName,products.id, products.name, products.category, products.description, products.prices, products.url, products.promotion, products.promotionIsActive
        FROM users INNER JOIN products ON products.id = ${id} && products.id_user_affiliate = users.id`;
  }
  static poductInfoWithIdUserAffiliate(id) {
    return `SELECT * FROM products where id_user_affiliate = ${id};`;
  }
  static deleteProduct(id) {
    return `DELETE FROM products WHERE id = ${id}`;
  }
  static editProduct(body) {
     
    return `UPDATE products  SET category = '${body.category.charAt(0).toUpperCase() +
      body.category.slice(1)}', name = '${body.name.charAt(0).toUpperCase() +
      body.name.slice(1)}', description = "${body.description}", prices = '${
      body.prices}',url = '${body.url}',promotion = '${body.promotion}', 
      promotionIsActive = '${body.promotionIsActive}' WHERE id = ${body.id}`;
  }
}
module.exports = sqlRequestProduct;
