const express = require('express');
const { check } = require('express-validator');
const shopConfig = require('../controllers/shop-config-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get('/', shopConfig.getConfig);

router.post(
  '/new',
  [
    check('dimX').notEmpty(),
    check('dimY').notEmpty(),
    check('startX').notEmpty(),
    check('startY').notEmpty(),
    check('endX').notEmpty(),
    check('endY').notEmpty(),
  ],
  shopConfig.createConfig
);

module.exports = router;
