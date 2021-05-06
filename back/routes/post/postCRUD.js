const express = require("express");
const User = require("../../models/user.js");
const router = express.Router();
// const bodyParser = require("body-parser");
// router.use(bodyParser.json());

// ref: https://kb.objectrocket.com/mongo-db/using-nodejs-and-mongoose-to-update-array-1205

router.route("/add").put((req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;

  const now = new Date(Date.now());
  const year = now.getFullYear();
  const month = now.getMonth() < 10 ? `0${now.getMonth()}` : now.getMonth();
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? `0${now.getSeconds()}` : now.getSeconds();
  const fullDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

  User.updateOne(
    { email },
    {
      $push: {
        post: [
          {
            title,
            content,
            createdAt: fullDate,
          },
        ],
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.route("/remove").put((req, res) => {
  const email = req.body.email;
  const id = req.body._id;

  User.updateOne(
    { email },
    {
      $pull: {
        post: {
          _id: id,
        },
      },
    },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
