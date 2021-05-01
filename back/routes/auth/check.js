const express = require("express");
const User = require("../../models/user.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("유효한 이메일을 입력해주세요.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("중복된 이메일 주소입니다.");
          }
        });
      }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed.");
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    } else {
      res.send("사용 가능한 이메일입니다!");
    }
  }
);

module.exports = router;
