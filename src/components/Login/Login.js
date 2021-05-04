import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";

function Login() {
    return (
        <section className="login">
            <Link to="/" className="login__home">
                <img className="login__logo" src={logo} alt="Логотип проект" />
            </Link>
            <h2 className="login__welcome">Рады видеть!</h2>
            <form className="login__form">
                <label className="login__label">
                    E-mail
                    <input
                        className="login__input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                    />
                    <span className="login__input-error"></span>
                </label>
                <label className="login__label">
                    Пароль
                    <input
                        className="login__input"
                        name="password"
                        type="password"
                        minLength="8"
                        placeholder="Пароль"
                        required
                        autoComplete="off"
                    />
                    <span className="login__input-error"></span>
                </label>
                <button type="submit" className="login__button">
                    Войти
                </button>
                <p className="login__paragraph">
                    Ещё не зарегистрированы?{" "}
                    <Link className="login__link" to="/sign-in">
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
