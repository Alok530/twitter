const express = require("express");
const { signin, signup } = require("../controllers/authController.js");

const router = express.Router();

//SIGNUP
router.post("/signup", signup);

//SIGNIN
router.post("/signin", signin);


module.exports = router;


//////////////////////
// import { verifyToken } from "../middleware/auth.js";
/* READ */
// router.get("/", verifyToken, getFeedPosts);
// router.get("/:userId/posts", verifyToken, getUserPosts);
// router.get("/:postId", verifyToken, delUserPosts);
/* UPDATE */
// router.patch("/:id/like", verifyToken, likePost);
// export default router;