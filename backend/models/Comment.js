const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String
  },
  // image: {
  //   type: String
  // },
  // video: {
  //   type: String
  // },
  likes: {
    type: Array,
    defualt: []
  },
  shares: {
    type: [String],
    default: []
  },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);