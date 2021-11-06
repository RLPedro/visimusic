import React from 'react';
import Nav from './Nav';
import AccountButton from './AccountButton';
import CartButton from './CartButton';
import { Link } from 'react-router-dom';
import '../style/Header.css';
import '../App.css';

const Header = ({handleProductState, cartProducts, username, headerBackground, handleBackground, handleHamburger, hamburgerOpen, setHamburgerOpen}) => {
  
  const clickHandler = () => {
    handleProductState([]);
    setHamburgerOpen(false);
  }
  
    return (
        <div className='header' style={headerBackground}>
          <div className='header-container'>
          <Nav handleHamburger={handleHamburger} hamburgerOpen={hamburgerOpen}/>
          <AccountButton username={username} handleBackground={handleBackground} setHamburgerOpen={setHamburgerOpen}/>
          <CartButton cartProducts={cartProducts} username={username} handleBackground={handleBackground} setHamburgerOpen={setHamburgerOpen}/>
          <Link style={linkStyle} to="/" className="header__logo" onClick={clickHandler}><img className="header__logo--pic" src="https://i.postimg.cc/43LH8zv1/logo-transparent-without-V.png" alt='Visishop logo'></img></Link>
          </div>
        </div>
    )
}

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}


export default Header;