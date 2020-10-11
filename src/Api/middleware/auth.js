const jwt = require('jsonwebtoken');
const config = require("../routes/modules/config");

module.exports  = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, config.secret);
    // console.log("MIDDLEWARE DECODED TOKEN:",decodedToken);
    if (token > 0) {
      console.log("MIDDLEWARE TOKEN:",token);
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};