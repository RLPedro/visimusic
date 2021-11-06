import '../style/Browse.css';
import '../App.css';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Browse = ({handleOpen, handleClose, browseAnchorEl, handleFetchGroup, handleBackground, handleHeaderBackground, setHamburgerOpen}) => {

  const handlePopoverOpen = (event) => {
    handleOpen(event.target);
    setHamburgerOpen(false);
  };

  const open = Boolean(browseAnchorEl);

  const clickHandleFetch = (productGroup) => {
    handleFetchGroup(productGroup);
    handleClose(null, null);
    handleBackground({background: '#282727'});
    handleHeaderBackground({background: '#282727'});
    setHamburgerOpen(false);
  }

  useEffect(() => {
    handleBackground({background: `no-repeat url('https://i.postimg.cc/D0nBd8h2/fiddle-background-edited-blur4.jpg')`, backgroundSize: 'cover'});
    handleHeaderBackground({background: 'transparent'});
  }, []);

    return (
        <div className="browse">
            <Popover
            className="browse__popover"
            anchorEl={browseAnchorEl}
            open={open}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            >
            <Link style={linkStyle} to="/products" className="browse__item browse__item--headphones" onClick={() => {clickHandleFetch('headphones')}}><span>Headphones</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--speakers" onClick={() => {clickHandleFetch('speakers')}}><span>Speakers</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--speakers" onClick={() => {clickHandleFetch('guitars')}}><span>Guitars</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--speakers" onClick={() => {clickHandleFetch('violins')}}><span>Violins</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--speakers" onClick={() => {clickHandleFetch('cellos')}}><span>Cellos</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--keyboards" onClick={() => {clickHandleFetch('keyboards')}}><span>Keyboards</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--microphones" onClick={() => {clickHandleFetch('microphones')}}><span>Microphones</span></Link>
            <Link style={linkStyle} to="/products" className="browse__item browse__item--djcontrollers" onClick={() => {clickHandleFetch('djcontrollers')}}><span>DJ Controllers</span></Link>

            <button className="browse__button-close" type="button" onClick={handleClose}>
                Close
            </button>
            </Popover>
            <button className="browse__button" type="button" onClick={handlePopoverOpen}>
                Browse Products
            </button>
              </div>
            )
}

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}

export default Browse;