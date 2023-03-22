const jwt = require("jsonwebtoken");
// const {JWT_SECRET} = require('../config/key.js');
const JWT_SECRET = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers; // string type
  // authorization === Bearer tokenvalue
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  // verify the token
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in!" });
    }

    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
