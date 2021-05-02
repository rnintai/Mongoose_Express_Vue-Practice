const express = require("express");
const User = require("../../models/user.js");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
  const decode = jwt.verify(req.headers.authorization, `${process.env.secret}`);
  if (decode === undefined) {
    const error = new Error("Token Verification error");
    error.status = 401;
    next(error);
  } else {
    User.find({ email: decode.email }, async (err, docs) => {
      res.status(202).json({
        msg: "success",
        userinfo: docs[0],
      });
    });
  }
});

module.exports = router;
