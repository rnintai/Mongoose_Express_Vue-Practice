const express = require("express");
const router = express.Router();

const { loginProcess } = require("./login.ctrl.js");

router.post("/", loginProcess);

module.exports = router;
