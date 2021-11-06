import '../style/SingleProduct.css';
import { useEffect } from 'react';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';

const SingleProduct = ({products, setProducts, username, getCart, handleHeaderBackground}) => {
  const { localStorage } = window;

  useEffect(() => {
    const items = localStorage.getItem('products');
    setProducts(JSON.parse(items));
    handleHeaderBackground({background: '#282727'});
}, []);

let item;
let name;
let price;
let desc;
let image;
let specs;

if (products.length > 0) {
  item = products[0];
  name = products[0].name;
  price = products[0].price;
  desc = products[0].description;
  image = products[0].img;
  specs = products[0].specs[0];
}

const addToCart = async () => {

  item.idInCart = uuid();

  await fetch('/api/carts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      item,
      method: 'add'
    })
  })
  getCart();
  console.log(`${item.name} added to the cart.`)
};

  return (
    products.length > 0 ? 
      <div className="single-product">
      <div className="single-product__image-container">
        <img className="single-product__image" src={image} border='0' alt={name}/>
      </div>
      <h3 className="single-product__name">{name}</h3>
      <p className="single-product__price">{price}</p>
      {username ? 
      <button onClick={addToCart} className="single-product__add-button">ADD TO CART</button>
      : <Link to={'/login'}><button className="single-product__add-button">ADD TO CART</button></Link>}
      <div className="single-product__desc-container">
        <p className="single-product__desc">{desc}</p>
        {Object.entries(specs).map(spec => (
          <div className="single-product__specs" key={uuid()}>
          <p className="single-product__specs-title">{spec[0]}</p>
          <p className="single-product__specs-desc">{spec[1]}</p>
          </div>
        ))}
      </div>
    </div> : null
  )

}

export default SingleProduct;