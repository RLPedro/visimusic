import '../style/Recoboard.css';
import RecoProducts from './RecoProducts';
import uuid from 'react-uuid';
import { useEffect } from 'react';

const RecoBoard = ({products, options, setProducts, setOptions, username, getCart, handleFetchSingle, setHamburgerOpen}) => {

  const { localStorage } = window;

  useEffect(() => {
    const items = localStorage.getItem('products');
    const optionStorage = localStorage.getItem('options');
    if(optionStorage.length > 2) {
      const optionArray = optionStorage.split(',');
      setOptions(optionArray);
    }
    setProducts(JSON.parse(items));
}, []);

  const recoProducts = [];
  products.forEach(product => {
    for (let i=0; i<product.use.length; i++) {
      for (let j=0; j<options.length; j++) {
        if (product.use[i] === options[j]) recoProducts.push(product)
      }
    }
  });

  let heading = '';
  options.forEach(option => heading += option + ', ');

  const groupNames = [];
  const arrObj = {};
    
  recoProducts.forEach(product => {
    if (!groupNames.includes(product.productGroup)) {
        groupNames.push(product.productGroup);
    }
  })

  groupNames.forEach(group => {
    arrObj[`${group}`] = []; 
  })

  recoProducts.forEach(product => {
    if (Object.keys(arrObj).includes(product.productGroup)) {
      arrObj[`${product.productGroup}`].push(product);
    }
  });

  let sortedObj = {};
  for (let arr in arrObj) {
    const sortedArr = arrObj[`${arr}`].sort((a, b) => (b.recRating - a.recRating));
    sortedObj[`${arr}`] = sortedArr;
  }

  return (
  <>
    <h3 key={uuid()}>Best options for {heading.replace(/, $/, '.')}</h3>
    {Object.entries(sortedObj).map(item => (
      <RecoProducts key={uuid()} productGroup={item[0]} product={item[1]} username={username} getCart={getCart} handleFetchSingle={handleFetchSingle} setHamburgerOpen={setHamburgerOpen}/>
    ))}
  </>
  )
  
}

export default RecoBoard;