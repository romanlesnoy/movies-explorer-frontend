import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import logo from "../../images/icons/logo.svg";
import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
    const headerBackgroundColoreStyle = loggedIn
        ? "header header_logged-in"
        : "header";

    const [isNavPopupIsOpen, setIsNavPopupOpen] = useState(false);

    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    function handleBurgerButtonClick() {
        setIsNavPopupOpen(true);
    }

    function closeNavPopup() {
        setIsNavPopupOpen(false);
    }
    return (
        <header className={headerBackgroundColoreStyle}>
            <Link to="/" className="header__link">
                <img className="header__logo" src={logo} alt="Логотип проект" />
            </Link>
            {loggedIn ? (
                <>
                    {!isMobile && ( //разметка loggedin && desktop resolution
                        <ul className="header__links">
                            <li className="header__link-item">
                                <NavLink
                                    to="/movies"
                                    className="header__link"
                                    activeClassName="header__link_active"
                                >
                                    Фильмы
                                </NavLink>
                            </li>
                            <li className="header__link-item ">
                                <NavLink
                                    to="/saved-movies"
                                    className="header__link"
                                    activeClassName="header__link_active"
                                >
                                    Сохранённые фильмы
                                </NavLink>
                            </li>
                            <li className="header__link-item header__link-item">
                                <NavLink
                                    to="/profile"
                                    className="header__link header__profile-link"
                                    activeClassName="header__link_active"
                                >
                                    Аккаунт
                                    <button className="header__profile-button" />
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    {isMobile && ( //разметка loggedin && mobile resolution
                        <>
                            <button
                                className="header__burger-button"
                                aria-label="Open navigation menu"
                                type="button"
                                onClick={handleBurgerButtonClick}
                            ></button>
                            <Navigation
                                isOpen={isNavPopupIsOpen}
                                onClose={closeNavPopup}
                            />
                        </>
                    )}
                </>
            ) : (
                //разметка loggedOut
                <ul className="header__links">
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
