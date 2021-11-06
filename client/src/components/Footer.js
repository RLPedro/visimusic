import '../style/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
          <div className="footer">
            <Link to="/about" style={linkStyle}><span>About us</span></Link>
            <Link to="/contact" style={linkStyle}><span>Contact</span></Link>
          </div>
    )
}

const linkStyle = {
  color: 'white',
  textDecoration: 'none'
}


export default Footer;