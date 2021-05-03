const express = require("express");
const User = require("../../models/user.js");
const router = express.Router();
// const bodyParser = require("body-parser");
// router.use(bodyParser.json());

// ref: https://kb.objectrocket.com/mongo-db/using-nodejs-and-mongoose-to-update-array-1205
router.route("/").put((req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;

  User.updateOne(
    { email },
    {
      $push: {
        post: [
          {
            title,
            content,
            createdAt: Date.now(),
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

module.exports = router;
