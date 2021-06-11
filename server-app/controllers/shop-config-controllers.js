const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const Config = require('../models/shop-config');
require('dotenv').config();

const getConfig = async (req, res, next) => {
  let config;
  try {
    config = await Config.find();
  } catch (err) {
    return next(new HttpError('Error getting config', 500));
  }
  let resp = null;
  if (config.length > 0) {
    resp = config[config.length - 1];
  }
  res.json({
    config: resp,
  });
};

const createConfig = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed.', 422));
  }
  const { dimX, dimY, startX, startY, endX, endY } = req.body;

  const createdConfig = new Config({
    dimX,
    dimY,
    startX,
    startY,
    endX,
    endY,
  });

  try {
    await createdConfig.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError('Adding a new config failed.', 500));
  }
  res.status(201).json({ config: createdConfig });
};

exports.getConfig = getConfig;
exports.createConfig = createConfig;
