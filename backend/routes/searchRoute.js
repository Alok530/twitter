const express = require("express");
const {searchComments,searchUsers,searchPosts} =  ("../controllers/searchController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//GET USERS
// router.get("/users", verifyToken,searchUsers);

//GET POSTS
// router.get("/posts", verifyToken,searchPosts);

//GET COMMNETS
// router.get("/comments", verifyToken,searchComments);

module.exports= router;