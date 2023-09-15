const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  // const isexist = await User.find({username:req.body.username});
  // if(isexist){
  //   return res.status(400).json('username already present');
  // }
  try {
    const newUser = new User({
      ...req.body,
      password: hash
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
    res.status(200).json({savedUser,token});
  } catch (err) {
    next(err);
  };
};

const signin = async (req, res, next) => {
  const { userEmailPhone } = req.body;
  try {
    const user = await User.findOne({
      $or: [{
        "email": userEmailPhone
      }, {
        "phone": userEmailPhone
      }, {
        "username": userEmailPhone
      }]
    });
    if (!user) return res.status(404).json("Wrong credentials!");

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkPassword) return res.status(404).json("Wrong credentials!");
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;    
    res.status(200).json({others,token});
  } catch (err) {
    next(err);
  };
};

module.exports = {signin,signup};