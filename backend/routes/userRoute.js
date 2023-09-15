const express = require("express");
const router = express.Router();
const {getUser,getUsers,getRandomUsers,likePost,followUser,bookmarkPost,getUsersPosts,updateUser,getLikedPosts,getFollowings,getFollowers,getBookmarks} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/auth.js");


//GET USER
router.get("/:id", verifyToken ,getUser);

//get RANDOM USERS
router.get("/random/users/sample", verifyToken ,getRandomUsers);

//GET ALL USERS
router.get("/", verifyToken ,getUsers);

//LIKE A Post
router.put("/like/:postId", verifyToken ,likePost);


//FOLLOW A USER
router.put("/follow/:currentUserId", verifyToken ,followUser);

//BOOKMARK A POST
router.put("/bookmark/:postId", verifyToken ,bookmarkPost);


//GET USER'S POSTS
router.get("/posts/:userId", verifyToken ,getUsersPosts);

//UPDATE USER
router.put("/:id", verifyToken ,updateUser);


//GET POSTS THAT USER HAS LIKED
router.get("/liked-posts/:userId", verifyToken ,getLikedPosts);


//GET USER'S FOLLOWINGS
router.get("/followings/:userId", verifyToken ,getFollowings);

//GET USER'S FOLLOWERS
router.get("/followers/:userId", verifyToken ,getFollowers);

//GET USER'S BOOKMARKS
router.get("/bookmarks/:userId", verifyToken ,getBookmarks);

module.exports = router;