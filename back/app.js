import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import cors from "cors";

import User from "./models/user.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post(
  "/auth/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please type valid email.")
      .custom((value) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be greater than 6 characters."),
    body("name").trim().not().isEmpty().withMessage("Name field is required."),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation Failed.");
      error.statusCode = 422;
      error.data = errors.array();
      return next(error);
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // 유저 이메일 중복 체크

    // 패스워드 해쉬화해서 저장
    try {
      const hashedPassword = await bcryptjs.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      const result = await user.save();
      res.status(201).json({
        message: "User Created",
        userId: result._id,
      });
    } catch (err) {
      if (err.statusCode !== 500) {
        next(err);
      }
    }
  }
);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data,
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0i9y2.mongodb.net/taskmanager?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => console.log("listening to port :3000"));
  })
  .catch((err) => console.log(err));
