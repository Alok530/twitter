const express = require("express");
const router = express.Router();
const {getUser,getUsers,getRandomUsers,likePost,sharePost,likeComment,followUser,bookmarkPost,getUsersPosts,updateUser,getComments,getLikedPosts,getLikedComments,getFollowings,getFollowers,getBookmarks} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/auth.js");


//GET USER
router.get("/:id", verifyToken ,getUser);

//get RANDOM USERS
router.get("/random/users/sample", verifyToken ,getRandomUsers);

//GET ALL USERS
router.get("/", verifyToken ,getUsers);

//LIKE A Post
router.put("/like/:postId", verifyToken ,likePost);

//LIKE COMMENT
router.put("/like/comment/:commentId", verifyToken ,likeComment);

//FOLLOW A USER
router.put("/follow/:currentUserId", verifyToken ,followUser);

//BOOKMARK A POST
router.put("/bookmark/:postId", verifyToken ,bookmarkPost);

router.put("/share/:postId", verifyToken ,sharePost);

//GET USER'S POSTS
router.get("/posts/:userId", verifyToken ,getUsersPosts);

//UPDATE USER
router.put("/:id", verifyToken ,updateUser);

//GET USERS'COMMENTS
router.get("/comments/:userId", verifyToken ,getComments);

//GET POSTS THAT USER HAS LIKED
router.get("/liked-posts/:userId", verifyToken ,getLikedPosts);

//GET COMMENTS TAHT USER HAS LIKED
router.get("/liked-comments/:userId", verifyToken ,getLikedComments);

//GET USER'S FOLLOWINGS
router.get("/followings/:userId", verifyToken ,getFollowings);

//GET USER'S FOLLOWERS
router.get("/followers/:userId", verifyToken ,getFollowers);

//GET USER'S BOOKMARKS
router.get("/bookmarks/:userId", verifyToken ,getBookmarks);

module.exports = router;