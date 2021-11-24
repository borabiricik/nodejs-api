const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, req.app.get("api_key"), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: "Token hatalı !",
        });
      } else {
        req.decode = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: "Token yok !",
    });
  }
};
