const express = require('express');
const { check } = require('express-validator');
const shelfControllers = require('../controllers/shelf-controllers');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get('/', shelfControllers.getShelves);

router.get('/:shelfId', shelfControllers.getShelvesById);

router.post(
  '/new',
  [
    check('name').notEmpty(),
    check('coordX').notEmpty(),
    check('coordY').notEmpty(),
    check('dimX').notEmpty(),
    check('dimY').notEmpty(),
  ],
  shelfControllers.createShelf
);

router.post(
  '/getshelvesconfiguration',
  [check('shelves').notEmpty()],
  shelfControllers.getShelvesConfiguration
);

module.exports = router;
