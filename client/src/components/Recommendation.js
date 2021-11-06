import '../style/Recommendation.css';
import Popover from '@material-ui/core/Popover';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Recommendation = ({handleOpen, handleClose, recoAnchorEl, handleFetchAll, handleOptions, handleBackground, handleHeaderBackground, setHamburgerOpen}) => {

    const [options, setOptions] = useState([]);

    const handlePopoverOpen = (event) => {
      handleOpen(event.target);
      setHamburgerOpen(false);
    };
    
    const handlePopoverClose = () => {
      handleClose();
      setOptions([]);
    };

    const handleFetchAndClose = () => {
      handleFetchAll(options);
      handleClose();
      handleBackground({background: '#282727'});
      handleHeaderBackground({background: '#282727'});
      setHamburgerOpen(false);
    }
    
    const clickHandler = (e) => {
      const item = e.target.textContent.toLowerCase();
      if (options.includes(item)) {
        setOptions(options.filter(string => string !== item));
      } else {
        handleOptions([...options, item]);
        setOptions([...options, item]);
      }
      e.target.classList.toggle('selected');
    }
    
    const open = Boolean(recoAnchorEl);

    const animationHandler = (e) => {
      e.target.children[0].classList.add('validation-animation');
      setTimeout(() => {
        e.target.children[0].classList.remove('validation-animation');
      }, 2995);
    }

    return (
        <div className="reco">
            <Popover
            className="reco__popover"
            anchorEl={recoAnchorEl}
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
            <header className="reco__header">Choose one or more options</header>
            <span className="reco__option" onClick={clickHandler}>Home</span>
            <span className="reco__option" onClick={clickHandler}>Outdoor</span>
            <span className="reco__option" onClick={clickHandler}>Professional</span>
            <span className="reco__option" onClick={clickHandler}>Studio</span>
            <span className="reco__option" onClick={clickHandler}>Sport</span>
            {options.length > 0 ?
              <Link to="/recommendation" className="reco__button-searchcontainer"> <button className="reco__button-search" onClick={handleFetchAndClose}>Search</button></Link>
            : <button className="reco__button-search reco__button-searchcontainer" onClick={animationHandler}>
              <div className="reco__button--warning">Please select at least one option</div>
              Search</button>
            }

            <button className="reco__button-close" onClick={handlePopoverClose}>
                Close
            </button>
            </Popover>
            <button className="reco__button" onClick={handlePopoverOpen}>Recommendations</button>
        </div>
    )
}

export default Recommendation;
