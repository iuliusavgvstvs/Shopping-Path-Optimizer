const express = require('express');
const { check } = require('express-validator');
const productsControllers = require('../controllers/products-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.use(checkAuth);

router.get('/', productsControllers.getProducts);

router.get('/:categoryId', productsControllers.getProductsByCategoryId);

router.post(
  '/new',
  [
    check('title').notEmpty(),
    check('description').notEmpty(),
    check('imageUrl').notEmpty(),
    check('price').notEmpty(),
    check('category').notEmpty(),
  ],
  productsControllers.createProduct
);

module.exports = router;
