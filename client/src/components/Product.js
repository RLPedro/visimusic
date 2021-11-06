import '../style/Product.css';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

const Product = ({name, price, description, imgUrl, use, item, username, getCart, id, handleProductState, handleFetchSingle, setHamburgerOpen}) => {

    let useCase = '';
    let newDesc = description;

    const onLoad = (e) => {
      if (e.target.height > 240) {
        e.target.height = 240
        e.target.width = 180
      }
    }

    const descriptionChecker = (desc) => {
      if (desc.length > 100) {
        const matchDesc = desc.match(/^[\d\D]{101}/);
        newDesc = matchDesc + '...';
      }
    }

    descriptionChecker(description);

    const useCaseSwitch = (input) => {
        switch(input) {
          case 'studio':
            useCase = 'Best suited for a studio enviroment';
            break;
          case 'home':
            useCase = 'Best suited for a home enviroment';
            break;
          case 'outdoors':
            useCase = 'Best suited for outdoor activites';
            break;
          default:
            return;
        }
    }

    const addToCart = async (e) => {

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
      e.target.children[0].classList.add('validation-animation');
      setTimeout(() => {
        e.target.children[0].classList.remove('validation-animation');
      }, 2980);
      console.log(`${item.name} added to the cart.`)
    };
    
    useCaseSwitch(use);

    const clickHandler = () => {
      setHamburgerOpen(false);
      handleProductState([])
        .then(handleFetchSingle(id))
    }
    
    return (
        <div className="product">
          <Link to={'/product'}>
            <div className="product__image-container" onClick={clickHandler}>
            <img className="product__image" onLoad={onLoad} src={imgUrl} border='0' alt={name}/>
            </div>
          </Link>
            <div className="product__desc-container">
              <h3 className="product__name">{name}</h3>
              <h3 className="product__desc">{newDesc}</h3>
              <h4 className="product__price">{price}</h4>
                <div className="product__desc-buttons"></div>
                  <Link to={'/product'}><button onClick={clickHandler} className="product__show-button">Show</button><br/></Link>
                  {username ? 
                  <button onClick={addToCart} className="product__add-button">
                  <div className="product__item-added">Added to cart</div>
                    Add to cart</button> 
                  : <Link to={'/login'}><button className="product__add-button">Add to cart</button></Link>
                }

                </div>
            </div>
    )
}

{/* {Object.entries(specs).map(item => (
  <>
  <span className="product__specs-heading">{item[0]}: </span>
  <span className="product__specs-item">{item[1]}</span><br/>
  </>
))} */}

{/* <h4>{useCase}</h4> */}
{/* <Link to={{ 
  pathname:"/product", 
  productProps:{
    name,
    }
  }} ></Link> */}


export default Product;
