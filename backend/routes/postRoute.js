const express = require("express");
const { createPost, deletePost,updatePost, getPost, getPosts, getTimeline, getUsersWhoLiked } = require("../controllers/postController.js");
const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

//CREATE
router.post("/", verifyToken,createPost);

// UPDATE
router.post("/update", verifyToken,updatePost);

//GET ALL POSTS
router.get("/", getPosts);

//GET TIMELINE POSTS
router.get("/timeline/:userId", verifyToken,getTimeline);

//GET SINGLE POST
router.get("/find/:id", getPost);

//GET USERS WHO LIKED A POST
router.get("/likes/:postId", verifyToken,getUsersWhoLiked);

//GET USERS WHO RETWEETED A POST
// router.get("/retweets/:postId", verifyToken,getUsersWhoRetweeted);

//DELETE
router.delete("/:id", verifyToken,deletePost);

module.exports= router;