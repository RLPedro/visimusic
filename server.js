const express = require('express');
const mongo = require('./mongo');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'client/build')));

app.get('/api/users/:username', async (req, res) => {
  const { username } = req.params;
  const filter = { username };
  await mongo.findUser(filter)
    .then(data => res.json(data));
})

app.get('/api/products/productGroup/:productGroup', async (req, res) => {
  const { productGroup } = req.params;
  const filter = { productGroup };
  await mongo.findProducts(filter)
    .then(data => res.json(data))
});

app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const filter = {_id: id};
  await mongo.findProducts(filter)
    .then(data => res.json(data))
});

app.get('/api/products', async (req, res) => {
  await mongo.findAllProducts()
    .then(data => res.json(data));
})

app.post('/api/products', async (req, res) => {
  const { name, description, specs, price, priceRange, productGroup, use, recRating, img } = req.body;
  const product = await mongo.addProduct(name, description, specs, price, priceRange, productGroup, use, recRating, img);

  res
    .json(product)
    .status(201)
    .end();
});

app.post('/api/users/register', async (req, res) => {
  const { name, email, username, password } = req.body;
  const user = await mongo.registerUser(name, email, username, password, data => res.cookie('token', data));
  console.log(name, username);
  await mongo.addCart(username);

  res
    .json()
    .status(201)
    .end();
})

app.post('/api/users/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await mongo.loginUser(username, password, data => res.cookie('token', data));


  res
    .json()
    .status(201)
    .end();
})

app.put('/api/carts', async (req, res) => {
  const { username, item, method, id } = req.body;
  let cart = {}

  method === 'add' ? 
  cart = await mongo.addToCart(username, item)
  : cart = await mongo.removeFromCart(username, item);
  
  res
    .json(cart)
    .status(201)
    .end();
})

app.get('/api/carts/:username', async (req, res) => {
  const { username } = req.params;
  const cart = await mongo.getCart(username);

  res.json(cart)
})

app.listen(port, () => console.log(`Visigoths app listening at http://localhost:${port}`));