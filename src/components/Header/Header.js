import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/icons/logo.svg";
import "./Header.css";

function Header({loggedIn}) {
    const headerBackgroundColoreStyle = loggedIn
        ? "header header_logged-in"
        : "header";
    return (
        <header className={headerBackgroundColoreStyle}>
            <Link to="/" className="header__link">
                <img className="header__logo" src={logo} alt="Логотип проект" />
            </Link>
            {loggedIn ? (
                <ul className="header_links">
                    <li className="header__link-item">
                        <Link to="/movies" className="header__link">
                            Фильмы
                        </Link>
                    </li>
                    <li className="header__link-item">
                        <Link to="/saved-movies" className="header__link">
                            Сохранённые фильмы
                        </Link>
                    </li>
                    <li className="header__link-item header__link-item">
                        <Link to="/profile" className="header__link header__profile-link">
                            Аккаунт
                            <button className="header__profile-button"/>
                        </Link>
                    </li>
                </ul>
            ) : (
                <ul className="header_links">
                    <li className="header__link-item">
                        <Link to="sign-up" className="header__link">
                            Регистрация
                        </Link>
                    </li>
                    <li className="header__link-item">
                        <Link to="sign-in" className="header__link">
                            <button className="header__button">Войти</button>
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
}

export default Header;
