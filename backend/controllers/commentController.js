const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");
const User = require("../models/User.js");

const createComment = async (req, res, next) => {
  const { userId, postId, text, image, video } = req.body;
  try {
    const comment = new Comment({
      userId,
      postId,
      text,
      image,
      video
    });
    const savedComment = await comment.save();
    await Post.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 }
    });
    res.status(200).json(savedComment);
  } catch (err) {
    next(err);
  };
};

const getComments = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  };
};

const getComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  };
};

const getUsersWhoLiked = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    const usersWhoLikedComment = await Promise.all(
      comment.likes.map((userId) => {
        return User.findById(userId);
      })
    );

    let usersList = [];
    usersWhoLikedComment.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};

const deleteComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const comment = await Comment.findById(commentId);
    const post = await Post.findById(comment.postId);
    await post.updateOne({ $inc: { commentsCount: -1 } });
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("Comment was deleted!");
  } catch (err) {
    next(err);
  };
};

module.exports = { createComment, deleteComment, getComment, getComments, getUsersWhoLiked };