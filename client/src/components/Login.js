import '../style/Login.css';
import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';

const Login = ({username, handleUsername}) => {

  const [userLogin, setUserLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    if (e.target.className === 'login__username') {
      setUserLogin(e.target.value);
    }
    if (e.target.className === 'login__password') {
      setPassword(e.target.value);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const result = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: userLogin, password
      })
    });

    // if(result.status === 'ok') {

    // } else {
    //   alert(result.error);
    // }

    handleUsername(userLogin);

    setUserLogin('');
    setPassword('');
    window.location.reload(false);


    return result;

  }

  return (
    <>
    {username && <Redirect to="/" /> }
    <section className="login">
      <h2 className="login__header">Login</h2>
      <form className="login__form">
        <input type="text" placeholder="username" className="login__username" onChange={handleChange} />
        <input type="password" placeholder="password" className="login__password" onChange={handleChange} />
        <input type="submit" value="Login" className="login__button" onClick={loginUser} />
      </form>
      <Link style={linkStyle} to="/register"><div className="login__register">Not a member? <div className="login__register--signup">Sign up!</div></div></Link>
    </section>
  </>
  )
}

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
}

export default Login;