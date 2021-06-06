const express = require('express');
const { check } = require('express-validator');
const categoriesControllers = require('../controllers/categories-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get('/', categoriesControllers.getCategories);

router.post(
  '/new',
  [check('title').notEmpty(), check('imageUrl').notEmpty()],
  categoriesControllers.createCategory
);

module.exports = router;
