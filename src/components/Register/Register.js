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
            <h2 className="login__welcome">Привет, Виталий!</h2>
            <form className="login__form">
                <label className="login__label">
                    Имя
                    <input
                        className="login__input"
                        name="name"
                        type="text"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="40"
                        required
                        autoComplete="off"
                    />
                    <span className="login__input-error"></span>
                </label>
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
            </form>
            <div className="login__buttons-container">
                <button type="submit" className="login__button">
                    Редактировать
                </button>
                <button type="button" className="login__button" role="link">
                    <Link className="login__button-link"to="/sign-in">Выйти из аккаунта</Link>
                </button>
            </div>
        </section>
    );
}

export default Login;
