import '../style/Register.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

const Register = ({handleUserCookie, cookies, thisUsername}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();

    const result = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, username, password
      })
    });

    if(result.status === 'ok') {

    } // else {
    //   alert(result.error);
    // }

    const token = await Cookies.get('token');
    const data = await JSON.parse(atob(token.split('.')[1]));
    handleUserCookie(data.username);

    setName('');
    setEmail('');
    setUsername('');
    setPassword('');

  }

  const handleChange = e => {
    if (e.target.className === 'register__name') {
      setName(e.target.value);
    }
    if (e.target.className === 'register__email') {
      setEmail(e.target.value);
    }
    if (e.target.className === 'register__username') {
      setUsername(e.target.value);
    }
    if (e.target.className === 'register__password') {
      setPassword(e.target.value);
    }
  };


  return (
    <>
    {thisUsername && <Redirect to="/" /> }
    <section className="register">
      <h2 className="register__header">Sign up</h2>
      <form className="register__form">
        <input type="text" placeholder="name" className="register__name" onChange={handleChange} value={name}/>
        <input type="text" placeholder="email" className="register__email" onChange={handleChange} value={email} />
        <input type="text" placeholder="username" className="register__username" onChange={handleChange} value={username}/>
        <input type="password" placeholder="password" className="register__password" onChange={handleChange} value={password} />
        <input type="submit" className="register__button" value="Create account" onClick={registerUser} />
      </form>
    </section>
    </>
  )
}

export default Register;