import '../style/Contact.css';
import { useEffect } from 'react';

const Contact = ({handleBackground, handleHeaderBackground}) => {

  useEffect(() => {
    handleBackground({background: `no-repeat url('https://i.postimg.cc/D0nBd8h2/fiddle-background-edited-blur4.jpg')`, backgroundSize: 'cover'});
    handleHeaderBackground({background: 'transparent'});
  }, []);

  return (
    <div className="contact">
    <h2 className="contact__title">Contact</h2>
    <article className="contact__content">
    <p>If you want to see your products in our platform, please reach us at:</p>
    <p>contact@visimusicshop.com</p>
    </article>
    </div>
  )
}

export default Contact;