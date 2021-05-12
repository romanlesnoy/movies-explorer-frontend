import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";

function Profile({ loggedIn }) {
    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({ email: "test@test.ru", name: "test" });

    function handleOnSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        resetForm();
    }
    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <h2 className="profile__welcome">Привет, Виталий!</h2>
                <form
                    className="profile__edit-form"
                    onSubmit={handleOnSubmit}
                    noValidate
                >
                    <label className="profile__label">
                        Имя
                        <input
                            className={`profile__input ${
                                errors.email && "profile__input_invalid"
                            }`}
                            name="name"
                            type="text"
                            placeholder="Имя"
                            required
                            value={values.name || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <span className="profile__input-error">{errors.name}</span>
                    <hr className="profile__divider" />
                    <label className="profile__label">
                        Почта
                        <input
                            className={`profile__input ${
                                errors.email && "profile__input_invalid"
                            }`}
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={values.email || ""}
                            onChange={handleChange}
                        />
                    </label>
                    <span className="profile__input-error">{errors.email}</span>
                </form>
                <div className="profile__buttons-container">
                    <button
                        type="submit"
                        className={`profile__button ${
                            !isValid && "profile__button_disable"
                        }`}
                        onClick={handleOnSubmit}
                    >
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
