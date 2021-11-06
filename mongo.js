require('dotenv').config()
const mongoose = require('mongoose');
const Product = require('./models/products');
const User = require('./models/user');
const Cart = require('./models/cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

mongoose.set('useFindAndModify', false);

const findUser = async (filter) => {
  const response = await User.find(filter).exec();
  return response;
}

const findProducts = async (filter) => {
  const response = await Product.find(filter).exec();
  return response;
}

const findAllProducts = async () => {
  const response = await Product.find({}).exec();
  return response;
}

const addProduct = async (name, description, specs, price, priceRange, productGroup, use, recRating, img) => {
  const product = new Product({
    name,
    description,
    specs,
    price,
    priceRange,
    productGroup,
    use,
    recRating,
    sales: 0,
    rating: 0,
    reviews: [],
    img
  });
  
  product.save(function (err) {
    if (err) return console.log(err);
  });
}

const addCart = async (username) => {
  const cart = new Cart({
    cartUser: username,
    items: []
  });
  
  cart.save(function (err) {
    if (err) return console.log(err);
  })

};

const addToCart = async (cartUser, item) => {
  const response = await Cart.findOneAndUpdate({cartUser}, {$push: {items: item}}, {new: true});
  return response;
}

const removeFromCart = async (cartUser, item) => {
  const response = await Cart.findOneAndUpdate({cartUser}, { $pull: { 'items':  {'idInCart' : item.idInCart}} }, {new: true});
  return response;
}

const getCart = async (cartUser) => {
  const response = await Cart.find({cartUser});
  return response[0].items;
}

const registerUser = async (name, email, username, password, cb) => {
  if(!name || typeof(name) !== 'string') {
    console.log('Invalid name')
    // return res.json({status: 'error', error: 'Invalid name'})
  }
  if(!email || typeof(email) !== 'string') {
    console.log('Invalid email')
    // return res.json({status: 'error', error: 'Invalid email'})
  }
  if(!username || typeof(username) !== 'string') {
    console.log('Invalid username')
    // return res.json({status: 'error', error: 'Invalid username'})
  }
  if(!password || typeof(password) !== 'string') {
    console.log('Invalid password')
    // return res.json({status: 'error', error: 'Invalid password'})
  }
  if(password.length < 5) {
    console.log('Password too short')
    // return res.json({status: 'error', error: 'Password too short'})
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      name,
      email,
      username,
      encryptedPassword
    })
    console.log('User created:', response)

    const user = await User.findOne({ username }).lean();

    const token = jwt.sign({ 
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET)

    return cb(token)

  } catch(error) {
    if(error.code === 11000) {
      return console.log({status: 'error', error: 'Username already in use'})
    }
    throw error;
  }

}

const loginUser = async (username, password, cb) => {
  const user = await User.findOne({ username }).lean();

  // if(!user) {
  //   return res.json({status: 'error', error: 'Invalid username/password'})
  // }

  if(await bcrypt.compare(password, user.encryptedPassword)) {
    const token = jwt.sign({ 
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email
    }, process.env.JWT_SECRET)

    return cb(token);

    // res.cookie('token', token);

    // return res.json({status: 'ok', data: token})
  }

  return console.log('error in loginUser')

  // res.json({status: 'error', error: 'invalid username/password'})

}

module.exports = {
  addProduct, findProducts, findAllProducts, registerUser, loginUser, addCart, addToCart, removeFromCart, getCart, findUser
}
