import '../style/Checkout.css';

const Checkout = ({cartProducts}) => {

  let priceArr = [];
  cartProducts.forEach(product => {
    let cleanPrice = product.price.slice(0, -3); 
    priceArr.push(parseInt(cleanPrice));
  })

  let totalAmount = priceArr.reduce((total, price) => total + price, 0);

  const clickHandler = (e) => {
    e.target.children[0].classList.add('validation-animation');
    setTimeout(() => {
      e.target.children[0].classList.remove('validation-animation');
    }, 2995);
  }

  return (
    <div className="checkout">
    <h3 className="checkout__title">Checkout</h3>
    <p style={{fontWeight: 'bold'}}>purchase</p>
    {cartProducts.map(product => (
      <div key={product.idInCart} className='checkout__product'>
      <span className='checkout__product-name'>{product.name}</span>
      <span className='checkout__product-price'>{product.price}</span>
      </div>
    ))}
    <div>
      <p className="checkout__total-amount-title">total</p>
      <p className="checkout__total-amount">{totalAmount} SEK</p>
    </div>

    <section className="address">
      <p className="checkout__address-title">Please enter your delivery address below:</p>
        <form className="address__form">
          <input type="text" placeholder="street and number" className="address__street"/>
          <input type="text" placeholder="postal code" className="address__postal"/>
          <input type="text" placeholder="city" className="address__city"/>
        </form>
      <button className="checkout__pay-button" onClick={clickHandler} >
        To payment
        <div className="validation-message">Coming soon!</div>
      </button>
    </section>

    </div>
  )
}

export default Checkout;