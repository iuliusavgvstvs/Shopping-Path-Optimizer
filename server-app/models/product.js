const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: String, required: true },
  category: [{ type: mongoose.Types.ObjectId, require: true, ref: 'Category' }],
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
