const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: "no headers provided",
    });
  }

  //Get the token from Bearer "token"
  const token = authorization.replace("Bearer ", "");

  //Verifying the user token for accessing protected pages
  //which user gets after successful login

  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      res.status(422).json({
        error: "You must be logged in",
      });
    } else {
      //Payload given at the time of signning in
      const { _id } = payload;

      User.findById({
        _id,
      }).then((userData) => {
        req.user = userData;
        next();
      });
    }
  });
};
