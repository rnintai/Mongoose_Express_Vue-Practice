const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");

const dotenv = require("dotenv");

dotenv.config();

const loginProcess = (req, res, next) => {
  const typed_email = req.body.email;
  const typed_password = req.body.password;
  let password = null;
  const secret = `${process.env.secret}`;

  User.find({ email: typed_email }, async (err, docs) => {
    if (docs.length === 0) {
      const error = new Error("입력하신 이메일이 존재하지 않습니다.");
      error.statusCode = 422;
      error.data = [
        {
          email: typed_email,
        },
      ];
      return next(error);
    } else {
      password = docs[0].password;
      if (await bcryptjs.compare(typed_password, password)) {
        const token = await jwt.sign(
          {
            email: typed_email,
          },
          secret,
          {
            expiresIn: "30m",
          }
        );
        res.status(201).json({
          message: "Login Success!",
          userId: docs[0]._id,
          token,
        });
      } else {
        const error = new Error("패스워드가 일치하지 않습니다.");
        error.statusCode = 422;
        return next(error);
      }
    }
  });
};

module.exports = { loginProcess };
