import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/icons/logo.svg";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <Link to="/" className="header__link">
                <img className="header__logo" src={logo} alt="Логотип проект" />
            </Link>
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
        </header>
    );
}

export default Header;
