import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';

const Register  = ({ handleSubmit }) => {
  const [userEmail, setUserEmail] = useState({
      email: ''
  });
  const [userPassword, setUserPassword] = useState({
    password: ''
  });

  const handleChangeEmail = (e) => {
    setUserEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setUserPassword(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    handleSubmit({
      email: userEmail,
      password: userPassword
    })
  }

    return (
      <>
      <Header page="/signin" text="Войти" />
      <Route path="/signin">
        <Login />
      </Route>
      <section className="sign">
      <div className="sign__container">
        <form
          name="sign-up"
          className="sign__form"
          noValidate
          onSubmit={submit}
        >
          <fieldset className="sign__fieldset">
            <legend>
              <h2 className="sign__title">Регистрация</h2>
            </legend>
            <input
      type="email"
      name="name"
      className="sign__input sign__input_value_name"
      required
      minLength="2"
      maxLength="40"
      placeholder="Email"
      autoComplete="off"
      onChange={handleChangeEmail}
    />
    <span
      className="sign__message sign__message_name_error"
      id="name-error"></span>
    <input
      type="password"
      name="current"
      className="sign__input sign__input_value_current"
      required
      minLength="2"
      maxLength="200"
      placeholder="Пароль"
      autoComplete="off"
      onChange={handleChangePassword}
    />
    <span
      className="sign__message sign__message_current_error"
      id="current-error"></span>
          </fieldset>
          <button
            className="sign__button"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="sign__text">Уже зарегистрированы? 
        <Link className="sign__text" to="/signin"> Войти</Link>
        </p>
      </div>
    </section>
    <Footer />
    </>
    )
}

export default Register;