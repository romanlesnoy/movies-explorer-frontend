import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";

function Register() {
    return (
        <section className="register">
            <Link to="/" className="register__home">
                <img className="register__logo" src={logo} alt="Логотип проект" />
            </Link>
            <h2 className="register__welcome">Добро пожаловать!</h2>
            <form className="register__form">
                <label className="register__label">
                    Имя
                    <input
                        className="register__input"
                        name="name"
                        type="text"
                        placeholder="Имя"
                        required
                        autoComplete="off"
                    />
                    <span className="register__input-error"></span>
                </label>
                <label className="register__label">
                    E-mail
                    <input
                        className="register__input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                    />
                    <span className="register__input-error"></span>
                </label>
                <label className="register__label">
                    Пароль
                    <input
                        className="register__input"
                        name="password"
                        type="password"
                        minLength="8"
                        placeholder="Пароль"
                        required
                        autoComplete="off"
                    />
                    <span className="register__input-error"></span>
                </label>
                <button type="submit" className="register__button">
                    Войти
                </button>
                <p className="register__paragraph">
                    Уже зарегистрированы?{" "}
                    <Link className="register__link" to="/sign-up">
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Register;
