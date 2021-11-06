import Product from './Product';
import '../style/Product.css';
import { useEffect } from 'react';


const ProductsBoard = ({products, cookies, username, getCart, handleFetchSingle, setProducts, handleProductState, setHamburgerOpen}) => {
    const { localStorage } = window;

    useEffect(() => {
        const items = localStorage.getItem('products');
        setProducts(JSON.parse(items));
    }, []);

    return products.map(product => (
        <Product key={product._id} id={product._id} name={product.name} price={product.price} use={product.use} specs={product.specs[0]} description={product.description} imgUrl={product.img} item={product} cookies={cookies} username={username} getCart={getCart} handleFetchSingle={handleFetchSingle} handleProductState={handleProductState} setHamburgerOpen={setHamburgerOpen}/>
    ))
}

export default ProductsBoard;