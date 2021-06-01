const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Signing up failed.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already, try log in instead.', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Signing up failed.', 500));
  }

  const createdUser = new User({
    email,
    password: hashedPassword,
    orders: [],
    cart: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Sign up failed.', 500));
  }

  let token;
  try {
    token = await jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      }
    );
  } catch (err) {
    return next(new HttpError('Sign up failed.', 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Loggin in failed.', 500));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(new HttpError('Loggin in failed.', 500));
  }

  if (!existingUser || !isValidPassword) {
    return next(new HttpError('Invalid credentials.', 403));
  }

  let token;
  try {
    token = await jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      }
    );
  } catch (err) {
    return next(new HttpError('Loging in failed.', 500));
  }
  res
    .status(201)
    .json({ userId: existingUser.id, email: existingUser.email, token });
};

exports.signup = signup;
exports.login = login;
