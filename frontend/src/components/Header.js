import logo from '../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({page, text, email, loggedIn, signOut}) => {
    return (
        <header className="header">
    <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__bar">
        {loggedIn && <p className="header__bar_email">{email}</p>}
        <p className="header__bar_email">{email}</p>
        <Link to={page} className="header__btn" onClick={signOut} >{text}</Link>
      </div>
  </header>
    )
}

export default Header;