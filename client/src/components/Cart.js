// TODO added total amount
import { Link } from 'react-router-dom';

const Cart = ({name, item, username, getCart, handleFetchSingle, handleProductState, setHamburgerOpen, totalAmount}) => {
  const removeFromCart = async (e) => {
    await fetch('/api/carts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        item,
        method: 'remove'
      })
    })
    getCart();
    console.log(`${username}: ${item.name} removed from your cart.`)
  };

  const clickHandler = () => {
    setHamburgerOpen(false);
    handleProductState([])
      .then(handleFetchSingle(item._id))
  }

  return (
    <article className="cart__product">
      <Link to="/product" onClick={clickHandler}>
      <div className="cart__img-container">
        <img className="cart__img" src={item.img} alt={item.name}/>
      </div>
      </Link>
      <div className="cart__name">{name}</div>
      <div className="cart__price">{item.price}</div>
      <button className="cart__remove" onClick={removeFromCart}>X</button>
    </article>
  )
}

export default Cart;