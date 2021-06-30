const express = require('express');
const { check } = require('express-validator');
const cartControllers = require('../controllers/cart-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get('/', cartControllers.getCarts);

router.post(
  '/new',
  [
    check('userId').notEmpty(),
    check('productId').notEmpty(),
    check('quantity').notEmpty(),
    check('sum').notEmpty(),
  ],
  cartControllers.createCart
);

router.post(
  '/getbyuserid',
  [check('userId').notEmpty()],
  cartControllers.getCartByUserId
);

module.exports = router;
