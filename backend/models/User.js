const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },  
  phone: {
    type: String,
  },
  profilePicture: {
    type: String
  },
  coverPicture: {
    type: String
  },
  about: {
    type: String
  },
  location: {
    type: String
  },
  bookmarkedPosts: {
    type: Array,
    default: [],
  },
  likedPosts: {
    type: Array,
    default: []
  },  
  followings: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },  
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);