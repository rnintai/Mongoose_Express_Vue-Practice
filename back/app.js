const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const loginRouter = require("./routes/auth/login.js");
const signupRouter = require("./routes/auth/signup.js");
const checkRouter = require("./routes/auth/check.js");
const userRouter = require("./routes/user/user.js");
const postRouter = require("./routes/post/postCRUD.js");

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth/login", loginRouter);
app.use("/auth/signup", signupRouter);
app.use("/auth/check", checkRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

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
