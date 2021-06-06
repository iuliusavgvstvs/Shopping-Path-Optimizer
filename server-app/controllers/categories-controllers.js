const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Category = require('../models/category');

require('dotenv').config();

const getCategories = async (req, res, next) => {
  let categories;
  try {
    categories = await Category.find();
  } catch (err) {
    return next(new HttpError('Error fetching categories', 500));
  }
  res.json({
    categories: categories.map((category) =>
      category.toObject({ getters: true })
    ),
  });
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { title, imageUrl } = req.body;

  const createdCategory = new Category({
    title,
    imageUrl,
  });

  try {
    await createdCategory.save();
  } catch (err) {
    return next(new HttpError('Adding a new category failed.', 500));
  }
  res.status(201).json({ category: createdCategory });
};

exports.getCategories = getCategories;
exports.createCategory = createCategory;
