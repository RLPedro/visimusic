import uuid from 'react-uuid';
import { Link } from 'react-router-dom';

const RecoProducts = ({productGroup, product, username, getCart, handleFetchSingle, setHamburgerOpen}) => {

    const productArr = []

    let usecase = "";
    const productUse = (useone, usetwo, usethree) => {
      if (usethree) {
        return usecase = `${useone}, ${usetwo}, ${usethree}.`;
      }
      if (usetwo) {
        return usecase = `${useone}, ${usetwo}.`;
      }
      if (useone) {
        return usecase = `${useone}.`;
      }
    }

    const addToCart = async (singleItem) => {

      singleItem.idInCart = uuid();
  
      await fetch('/api/carts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          item: singleItem,
          method: 'add'
        })
      })
      getCart();
      console.log(`${singleItem.name} added to the cart.`)
    };

    const clickHandler = (id) => {
      setHamburgerOpen(false);
      handleFetchSingle(id)
    }
    
    return (
      <>
      <h1 className="recoboard__groupheader">{productGroup}</h1>
      <section className="recoboard__container">
      {product.map(item => {
        // console.log(item);
        productUse(item.use[0], item.use[1], item.use[2]);
          if (!productArr.includes(item)) {
            productArr.push(item);
            return <article key={item._id} className="recoproduct">
              <Link to={'/product'}>
                <div onClick={() => {clickHandler(item._id)}} className="recoproduct__img-container">
                <img className="recoproduct__img" src={item.img} alt={item.name}/>
                </div>
              </Link>
              <div className="recoproduct__name">{item.name}</div>
              <div className="recoproduct__use">{usecase}</div>
              <div className="recoproduct__price">{item.price}</div>
              {username ? 
                <button onClick={() => addToCart(item)} className="recoproduct__add">Add to cart</button> 
                : <Link to={'/login'}><button className="recoproduct__add">Add to cart</button></Link>
              }
            </article>
          }
          return null;
    })}
      </section>
      </>
    )

}

export default RecoProducts;