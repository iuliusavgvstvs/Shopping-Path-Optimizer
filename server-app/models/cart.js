const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Product' }],
  quantity: { type: String, required: true },
  sum: { type: String, required: true },
});

cartSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Cart', cartSchema);
