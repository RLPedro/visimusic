import Cart from './Cart';
import '../style/Cart.css';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';

const CartBoard = ({cartProducts, username, getCart, handleBackground, handleFetchSingle, handleProductState, setHamburgerOpen}) => {

  const clickHandler = () => {
    handleBackground({background: '#282727'});
  }

  let priceArr = [];
  cartProducts.forEach(product => {
    let cleanPrice = product.price.slice(0, -3); 
    priceArr.push(parseInt(cleanPrice));
  })

  let totalAmount = priceArr.reduce((total, price) => total + price, 0);

  return (
    <>
    <h2 className="cart__title">Cart</h2>
    <div className='cart-board'>
    {cartProducts.map(product => (
      <Cart key={uuid()} name={product.name} item={product} username={username} getCart={getCart} handleFetchSingle={handleFetchSingle} handleProductState={handleProductState} setHamburgerOpen={setHamburgerOpen}/>
    ))}
    </div>
    <h4 className="cart__total-amount-title">total</h4>
    <p className="cart__total-amount">{totalAmount} SEK</p>
    <Link style={linkStyle} to="/checkout" className='checkout__link' onClick={() => {clickHandler()}}><button className="checkout__link-button">Checkout</button></Link>
    </>
  )
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

export default CartBoard;