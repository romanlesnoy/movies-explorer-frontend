import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Login() {
    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({});

    function handleOnSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        resetForm();
    }

    return (
        <section className="login">
            <Link to="/" className="login__home">
                <img className="login__logo" src={logo} alt="Логотип проект" />
            </Link>
            <h2 className="login__welcome">Рады видеть!</h2>
            <form className="login__form" onSubmit={handleOnSubmit}>
                <label className="login__label">
                    E-mail
                    <input
                        className={`login__input ${
                            errors.email && "login__input_invalid"
                        }`}
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.email || ""}
                    />
                    <span className="login__input-error">{errors.email}</span>
                </label>
                <label className="login__label">
                    Пароль
                    <input
                        className={`login__input ${
                            errors.password && "login__input_invalid"
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
                    <span className="login__input-error">
                        {errors.password}
                    </span>
                </label>
                <button
                    type="submit"
                    className={`login__submit-button ${!isValid && "login__submit-button_disable"}`}
                    disabled={!isValid}
                >
                    Войти
                </button>
                <p className="login__paragraph">
                    Ещё не зарегистрированы?{" "}
                    <Link className="login__link" to="/sign-up">
                        Регистрация
                    </Link>
                </p>
            </form>
        </section>
    );
}

export default Login;
