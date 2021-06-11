const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Shelf = require('../models/shelf');
var solve = require('../solvers/salesman');
var Point = require('../solvers/Point');

require('dotenv').config();

const getShelves = async (req, res, next) => {
  let shelves;
  try {
    shelves = await Shelf.find();
  } catch (err) {
    return next(new HttpError('Error fetching shelves', 500));
  }
  res.json({
    shelves: shelves.map((shelf) => shelf.toObject({ getters: true })),
  });
};

const getShelvesById = async (req, res, next) => {
  const shelfId = req.params.shelfId;
  let shelves;
  try {
    shelves = await Shelf.find({ _id: shelfId });
  } catch (err) {
    return next(new HttpError('Error fetching shelves with given id', 500));
  }
  res.json({
    shelves: shelves.map((shelf) => shelf.toObject({ getters: true })),
  });
};

const createShelf = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { name, coordX, coordY, dimX, dimY } = req.body;

  const createdShelf = new Shelf({
    name,
    coordX,
    coordY,
    dimX,
    dimY,
  });

  try {
    await createdShelf.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Adding a new shelf failed.', 500));
  }
  res.status(201).json({ shelf: createdShelf });
};

const getShelvesConfiguration = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { shelves } = req.body;
  var coords = [];
  shelves.forEach((shelf) => {
    coords.push([parseInt(shelf.coordX), parseInt(shelf.coordY)]);
  });

  var points = coords.map(([x, y]) => new Point(x, y));
  var resp = solve(points);

  res.status(201).json({ orderedShelves: resp });
};

exports.getShelves = getShelves;
exports.getShelvesById = getShelvesById;
exports.createShelf = createShelf;
exports.getShelvesConfiguration = getShelvesConfiguration;
