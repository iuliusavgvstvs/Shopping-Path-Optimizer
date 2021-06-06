const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);
