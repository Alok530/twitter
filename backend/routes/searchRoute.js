const express = require("express");
const router = express.Router();
const {searchUsers} =  require("../controllers/searchController.js");
const { verifyToken } = require("../middleware/auth.js");


//GET USERS
router.get("/users",verifyToken,searchUsers);


module.exports = router;