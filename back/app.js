import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0i9y2.mongodb.net/taskmanager?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000, () => console.log("listening to port :3000"));
  });
