// check for token and send message if not present
import '../style/Account.css';
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Account = ({handleLogout, cookies, name, username, email}) => {

  const [thisName, setThisName] = useState('');

  const handleClick = () => {
    handleLogout();
    window.location.reload(false);
  }
  
  useEffect(() => {
    if(username) {
      const firstLetter = name[0].toUpperCase();
      const afterName = name.slice(1, (name.length));
      setThisName(firstLetter + afterName);
    }
  }, [username]);

  return (
    <>
    <div className="account-info">
      <h2 className="account-info__name">Hi, {thisName}</h2>
      <div className="account-info__username--title">username</div>
      <div className="account-info__username">{username}</div>
      <div className="account-info__email--title">email</div>
      <div className="account-info__email">{email}</div>
    </div>
    <button onClick={handleClick} className="logout-button">Logout</button>
    {!cookies.token && <Redirect to="/" /> }
    </>
  )
}

export default Account;