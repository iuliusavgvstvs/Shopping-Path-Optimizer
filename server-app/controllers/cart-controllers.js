const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Cart = require('../models/cart');

require('dotenv').config();

const getCarts = async (req, res, next) => {
  let carts;
  try {
    carts = await Cart.find();
  } catch (err) {
    return next(new HttpError('Error fetching carts', 500));
  }
  res.json({
    carts: carts.map((cart) => cart.toObject({ getters: true })),
  });
};

const getCartByUserId = async (req, res, next) => {
  const { userId } = req.body;
  let carts;
  try {
    carts = await Cart.find({ _user: userId });
  } catch (err) {
    return next(new HttpError('Error fetching carts', 500));
  }
  res.json({
    carts: carts.map((cart) => cart.toObject({ getters: true })),
  });
};

const createCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { userId, productId, quantity, sum } = req.body;

  const createdCart = new Cart({
    userId,
    productId,
    quantity,
    sum,
  });

  try {
    await createdCart.save();
  } catch (err) {
    return next(new HttpError('Adding a new cart failed.', 500));
  }
  res.status(201).json({ category: createdCategory });
};

exports.getCarts = getCarts;
exports.getCartByUserId = getCartByUserId;
exports.createCart = createCart;
