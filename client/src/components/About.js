import '../style/About.css';
import { useEffect } from 'react';

const About = ({handleBackground, handleHeaderBackground}) => {

  useEffect(() => {
    handleBackground({background: `no-repeat url('https://i.postimg.cc/D0nBd8h2/fiddle-background-edited-blur4.jpg')`, backgroundSize: 'cover'});
    handleHeaderBackground({background: 'transparent'});
  }, []);

  return (
    <div className="about">
      <h2 className="about__title">About our shop</h2>
      <article className="about__content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis arcu mauris, eu posuere diam tempor at. Praesent ut tempus quam. Nullam at vehicula erat, et consequat ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tincidunt tempus diam, quis feugiat nisl. Integer est libero, faucibus eget tortor ac, condimentum gravida tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vestibulum, lorem consectetur viverra tincidunt, tellus ipsum viverra elit, quis vehicula leo mi non odio.
        </p> < br/>
        <h3>Development team:</h3>
        <p>Ricardo Leitão Pedro</p>
        <p>Samuel Ekholm</p>
    </article>
  </div>
  )
}

export default About;