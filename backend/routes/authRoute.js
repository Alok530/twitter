const express = require("express");
const { signin, signup } = require("../controllers/authController.js");

const router = express.Router();

//SIGNUP
router.post("/signup", signup);

//SIGNIN
router.post("/signin", signin);


module.exports = router;