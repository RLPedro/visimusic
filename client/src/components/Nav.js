import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';

const Nav = ({handleHamburger, hamburgerOpen}) => {

  return (
    <div className="navigation-container">
      <div className="navigation">
        <ul>
          <Link style={linkStyle} to="/about" onClick={handleHamburger}><li>About us</li></Link>
          <Link style={linkStyle} to="/contact" onClick={handleHamburger}><li>Contact</li></Link>
        </ul>

        <div className="hamburger-container" onClick={handleHamburger}>
          <Hamburger isOpen={hamburgerOpen}/>
        </div>
      </div>

      <style jsx="true">{`

        .navigation-container {
          position: absolute;
          width: 50px;
          margin: 0 0.5rem 0 0.5rem;
        }

        .navigation {
          width: 100%;
        }

        .navigation ul {
          display: ${hamburgerOpen ? 'inline' : 'none'};
          color: white;
          height: 100vh;
          width: 20vw;
          margin-top: 50px;
          padding: 0;
          position: absolute;
        }
        
        .navigation ul li {
          list-style-type: none;
          // padding-right: 10px;
        }

        .hamburger-container {
          margin: 0;
          padding: 0;
        }

    `}</style>
    </div>
  )
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}

export default Nav;