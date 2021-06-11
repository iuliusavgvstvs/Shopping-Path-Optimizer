const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const shelfSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  coordX: { type: String, required: true },
  coordY: { type: String, required: true },
  dimX: { type: String, required: true },
  dimY: { type: String, required: true },
});

shelfSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Shelf', shelfSchema);
