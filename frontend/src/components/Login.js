import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';

const Login  = ({handleSubmit}) => {
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
        <Header page="/signup" text="Зарегистрироваться" />
        <section className="sign">
        <div className="sign__container">
          <form
            name="sign-in"
            className="sign__form"
            noValidate
            onSubmit={submit}
          >
            <fieldset className="sign__fieldset">
              <legend>
                <h2 className="sign__title">Вход</h2>
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
        // value={name}
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
        // value={description}
        onChange={handleChangePassword}
      />
      <span
        className="sign__message sign__message_current_error"
        id="current-error"></span>
            </fieldset>
            <button
              className="sign__button"
              type="submit"
            //   disabled={isLoading}
            >
              Войти
            </button>
          </form>
        </div>
      </section>
      <Footer />
      </>
    )
}

export default Login;