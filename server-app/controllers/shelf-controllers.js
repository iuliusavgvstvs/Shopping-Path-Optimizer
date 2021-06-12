const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Shelf = require('../models/shelf');
var solve = require('../solvers/salesman');
var Point = require('../solvers/Point');
const { astar, Graph } = require('../solvers/astar');
const generateMatrix = require('../solvers/util');

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
    return next(new HttpError('Adding a new shelf failed.', 500));
  }
  res.status(201).json({ shelf: createdShelf });
};

const getShelvesConfiguration = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { allshelves, shelves, dimX, dimY } = req.body;

  var coords = [];
  shelves.forEach((shelf) => {
    coords.push([parseInt(shelf.coordX), parseInt(shelf.coordY)]);
  });
  var points = coords.map(([x, y]) => new Point(x, y));
  var orderedShelves = solve(points);

  var mtr = generateMatrix(dimX, dimY, allshelves);
  var graph = new Graph(mtr);
  var start = graph.grid[shelves[0].coordX][shelves[0].coordY];
  const stopShelf = shelves[orderedShelves[1]];
  var end = graph.grid[parseInt(stopShelf.coordX) + 1][stopShelf.coordY - 1];

  var path = astar.search(graph, start, end);

  path.forEach((node) => {
    mtr[node.x][node.y] = '-';
  });

  mtr[shelves[0].coordX][shelves[0].coordY] = 'start';
  mtr[parseInt(stopShelf.coordX) + 1][stopShelf.coordY] = 'stop';
  res.status(201).json({ orderedShelves, path: mtr });
};

const generateNext = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { allshelves, dimX, dimY, startX, startY, endX, endY } = req.body;
  try {
    var mtr = await generateMatrix(dimX, dimY, allshelves);
    mtr[parseInt(startX)][parseInt(startY) - 1] = 1;
    var graph = await new Graph(mtr);

    var start = graph.grid[parseInt(startX) + 1][parseInt(startY) - 1];
    let end;
    if (parseInt(endX) + 1 < dimX) {
      end = graph.grid[parseInt(endX) + 1][parseInt(endY) - 1];
    } else {
      end = graph.grid[parseInt(endX)][parseInt(endY) - 1];
    }

    var path = astar.search(graph, start, end);

    path.forEach((node) => {
      mtr[node.x][node.y] = '-';
    });

    mtr[parseInt(startX) + 1][parseInt(startY) - 1] = 'start';
    if (parseInt(endX) + 1 < dimX) {
      mtr[parseInt(endX) + 1][parseInt(endY)] = 'stop';
    } else {
      mtr[parseInt(endX)][parseInt(endY)] = 'stop';
    }
  } catch (err) {
    return next(new HttpError('Generating path failed. Please try again', 500));
  }
  res.status(201).json({ path: mtr });
};

exports.getShelves = getShelves;
exports.getShelvesById = getShelvesById;
exports.createShelf = createShelf;
exports.getShelvesConfiguration = getShelvesConfiguration;
exports.generateNext = generateNext;
