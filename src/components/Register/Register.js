import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ onRegister }) {
    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({});

    function handleOnSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        onRegister(values);
        resetForm();
    }

    return (
        <section className="register">
            <Link to="/" className="register__home">
                <img
                    className="register__logo"
                    src={logo}
                    alt="Логотип проект"
                />
            </Link>
            <h2 className="register__welcome">Добро пожаловать!</h2>
            <form className="register__form" onSubmit={handleOnSubmit}>
                <label className="register__label">
                    Имя
                    <input
                        className={`register__input ${
                            errors.name && "register__input_invalid"
                        }`}
                        name="name"
                        type="text"
                        placeholder="Имя"
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.name || ""}
                    />
                    <span className="register__input-error">{errors.name}</span>
                </label>
                <label className="register__label">
                    E-mail
                    <input
                        className={`register__input ${
                            errors.email && "register__input_invalid"
                        }`}
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.email || ""}
                    />
                    <span className="register__input-error">
                        {errors.email}
                    </span>
                </label>
                <label className="register__label">
                    Пароль
                    <input
                        className={`register__input ${
                            errors.password && "register__input_invalid"
                        }`}
                        name="password"
                        type="password"
                        minLength="8"
                        placeholder="Пароль"
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.password || ""}
                    />
                    <span className="register__input-error">
                        {errors.password}
                    </span>
                </label>
                <button
                    type="submit"
                    className={`register__submit-button ${
                        !isValid && "register__submit-button_disable"
                    }`}
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>
                <p className="register__paragraph">
                    Уже зарегистрированы?{" "}
                    <Link className="register__link" to="/sign-in">
                        Войти
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Register;
