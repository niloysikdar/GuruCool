const User = require('../models/User');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//I1bcWEHOC7HeBFZb
exports.createUser = async (req, res) => {
  console.log(req.body.email);
  const isEmailExist = await User.findOne({ email: req.body.email });

  // throw error when email already registered
  if (isEmailExist) {
    logger(
      400,
      'User not created',
      'Email already exists',
      JSON.stringify(req.user)
    );
    return res.status(400).json({ error: 'Email already exists' });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password,
    role: req.body.role,
    rollNo: req.body.rollNo,
  });

  try {
    const savedUser = await user.save();
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    logger(200, 'User created', savedUser, JSON.stringify(req.body.email));
    res.json({
      userId: savedUser._id,
      token: token,
      user: savedUser,
    });
  } catch (error) {
    logger(400, 'User not created', error, JSON.stringify(req.body.email));
    res.status(400).json({ error });
  }
};

exports.loginUser = async (req, res) => {
  const isUserExist = await User.findOne({ email: req.body.email });

  if (!isUserExist) {
    logger(
      400,
      'User not found',
      'Email not found',
      JSON.stringify(req.body.email)
    );
    return res.status(400).json({ error: 'Email not found' });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    isUserExist.password
  );

  if (!isPasswordMatch) {
    logger(
      400,
      'User not found',
      'Password not match',
      JSON.stringify(req.user)
    );
    return res.status(400).json({ error: 'Password not match' });
  }
  const token = jwt.sign({ userId: isUserExist._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  logger(200, 'User logged in', isUserExist, JSON.stringify(req.body.email));
  res.json({ userId: isUserExist._id, token: token, user: isUserExist });
};

exports.getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  logger(200, 'User found', user, JSON.stringify(req.user.userId));
  res.json({ userId: user._id, user: user });
};


