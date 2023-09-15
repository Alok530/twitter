const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const searchUsers = async (req, res, next) => {
  const q = req.query.q;
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { name: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  };
};

const searchPosts = async (req, res, next) => {
  const q = req.query.q;
  try {
    const posts = await Post.find({
      $or: [
        { desc: { $regex: q, $options: "i" } },
        { userUsername: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  };
};

const searchComments = async (req, res, next) => {
  const q = req.query.q;
  try {
    const comments = await Comment.find({
      $or: [
        { text: { $regex: q, $options: "i" } }
      ]
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  };
};

module.exports = {searchComments,searchUsers,searchPosts};