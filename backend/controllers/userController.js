const User = require("../models/User.js");
const Post = require("../models/Post.js");

const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  };
};

const getRandomUsers = async (req, res, next) => {
  try {
    const randomUsers = await User.aggregate([{ $sample: { size: 5 } }]);
    res.status(200).json(randomUsers);
  } catch (err) {
    next(err);
  };
};


const likePost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post.likes.includes(userId)) {
      const updatedPost = await post.updateOne({ $push: { likes: userId } }, { new: true });
      await user.updateOne({ $push: { likedPosts: postId } });
      res.status(200).json(post);
    } else {
      const updatedPost = await post.updateOne({ $pull: { likes: userId } }, { new: true });
      await user.updateOne({ $pull: { likedPosts: postId } });
      res.status(200).json(post);
    };
  } catch (err) {
    next(err);
  };
};


const followUser = async (req, res, next) => {
  const currentUserId = req.params.currentUserId;
  const userId = req.body.userId;
  try {
    const currentUser = await User.findById(currentUserId);
    const user = await User.findById(userId);
    if (!currentUser.followings.includes(userId)) {
      await currentUser.updateOne({ $push: { followings: userId } });
      await user.updateOne({ $push: { followers: currentUserId } });
      res.status(200).send("You follow ");
    } else {
      await currentUser.updateOne({ $pull: { followings: userId } });
      await user.updateOne({ $pull: { followers: currentUserId } });
      res.status(200).json("You unfollowed ");
    }
  } catch (err) {
    next(err);
  };
};


const bookmarkPost = async (req, res, next) => {
  const postId = req.params.postId;
  const userId = req.body.userId;
  try {
    const user = await User.findById(userId);
    if (!user.bookmarkedPosts.includes(postId)) {
      await user.updateOne({ $push: { bookmarkedPosts: postId } });
      res.status(200).send("Tweet added to your bookmarks!");
    } else {
      await user.updateOne({ $pull: { bookmarkedPosts: postId } });
      res.status(200).send("Tweet removed from your bookmarks!");
    };
  } catch (err) {
    next(err);
  };
};


const getUsersPosts = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const usersPosts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    res.status(200).json(usersPosts);
  } catch (err) {
    next(err);
  };
};


const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.body.userId === userId) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: req.body
      }, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    };
  } else {
    res.status(401).send("You can update only your account!");
  };
};


const getLikedPosts = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const likedPosts = await Promise.all(
      user.likedPosts.map((postId) => {
        return Post.findById(postId);
      })
    );

    let postsList = [];
    likedPosts.map((post) => {
      const { _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt } = post;
      postsList.push({ _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt });
    });

    res.status(200).json(postsList);
  } catch (err) {
    next(err);
  };
};


const getFollowings = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const userFollowings = await Promise.all(
      user.followings.map((following) => {
        return User.findById(following);
      })
    );

    let usersList = [];
    userFollowings.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};


const getFollowers = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const userFollowers = await Promise.all(
      user.followers.map((follower) => {
        return User.findById(follower);
      })
    );

    let usersList = [];
    userFollowers.map((user) => {
      const { _id, username, profilePicture, about } = user;
      usersList.push({ _id, username, profilePicture, about });
    });

    res.status(200).json(usersList);
  } catch (err) {
    next(err);
  };
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  };
};

const getBookmarks = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const bookmarkedPosts = await Promise.all(
      user.bookmarkedPosts.map((postId) => {
        return Post.findById(postId);
      })
    );

    let bookmarksList = [];
    bookmarkedPosts.map((post) => {
      const { _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt } = post;
      bookmarksList.push({ _id, userId, desc, images, video, shares, likes, whoCanReply, commentsCount, createdAt, updatedAt });
    });
    res.status(200).json(bookmarksList);
  } catch (err) {
    console.log(err);
  };
};

module.exports = {getUser,getRandomUsers,likePost,followUser,bookmarkPost,getUsersPosts,updateUser,getLikedPosts,getFollowings,getFollowers,getUsers,getBookmarks}