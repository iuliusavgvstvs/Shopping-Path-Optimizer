const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Product = require('../models/product');

require('dotenv').config();

const getProducts = async (req, res, next) => {
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    return next(new HttpError('Error fetching products', 500));
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductsByCategoryId = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  let products;
  try {
    products = await Product.find({ category: categoryId });
  } catch (err) {
    return next(
      new HttpError('Error fetching products with given category id', 500)
    );
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const getProductsByName = async (req, res, next) => {
  const searchString = req.params.s;
  let products;
  try {
    products = await Product.find({
      title: { $regex: searchString, $options: 'i' },
    });
  } catch (err) {
    return next(
      new HttpError('Error fetching products with given product name', 500)
    );
  }
  res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { title, description, imageUrl, price, category } = req.body;

  const createdProduct = new Product({
    title,
    description,
    imageUrl,
    price,
    category,
  });

  try {
    await createdProduct.save();
  } catch (err) {
    return next(new HttpError('Adding a new product failed.', 500));
  }
  res.status(201).json({ product: createdProduct });
};
exports.getProducts = getProducts;
exports.getProductsByCategoryId = getProductsByCategoryId;
exports.getProductsByName = getProductsByName;
exports.createProduct = createProduct;
