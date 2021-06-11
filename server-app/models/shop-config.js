const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const configSchema = new mongoose.Schema({
  dimX: { type: String, required: true },
  dimY: { type: String, required: true },
  startX: { type: String, required: true },
  startY: { type: String, required: true },
  endX: { type: String, required: true },
  endY: { type: String, required: true },
});

configSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Config', configSchema);
