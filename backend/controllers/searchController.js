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

module.exports = {searchUsers};