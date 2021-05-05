import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

function Profile({loggedIn}) {
    return (
        <>
            <Header loggedIn={loggedIn}/>
            <section className="profile">
                <h2 className="profile__welcome">Привет, Виталий!</h2>
                <form className="profile__edit-form">
                    <label className="profile__label">
                        Имя
                        <input
                            className="profile__input"
                            name="name"
                            type="text"
                            placeholder="Имя"
                            required
                        />
                    </label>
                    <hr className="profile__divider" />
                    <label className="profile__label">
                        Почта
                        <input
                            className="profile__input"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </label>
                </form>
                <div className="profile__buttons-container">
                    <button type="submit" className="profile__button">
                        Редактировать
                    </button>
                    <button
                        type="button"
                        className="profile__button"
                        role="link"
                    >
                        <Link className="profile__button-link" to="/sign-in">
                            Выйти из аккаунта
                        </Link>
                    </button>
                </div>
            </section>
        </>
    );
}

export default Profile;
