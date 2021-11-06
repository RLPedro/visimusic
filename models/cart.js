const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cartUser: { type: String, required: true, unique: true },
  items: { type: Array, required: true }
},
  { collection: 'carts' }
)

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;