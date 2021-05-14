import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Profile.css";
import useFormValidation from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../context/currentUserContext";

function Profile({ loggedIn, apiResponseMessage, userData, onEditProfile, onLogOut }) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, errors, isValid, handleChange, resetForm } =
        useFormValidation({ email: currentUser.email, name: currentUser.name });

    const [isValuesNotMatched, setisValuesNotMatched] = useState(false);

    const checkValues = () => {
        if (
            currentUser.email === values.email &&
            currentUser.name === values.name
        ) {
            setisValuesNotMatched(false);
        } else {
            setisValuesNotMatched(true);
        }
    };

    useEffect(() => {
        checkValues();
    }, [handleChange]);

    function handleOnSubmit(evt) {
        evt.preventDefault();
        onEditProfile(values);
        resetForm();
    }
    return (
        <>
            <Header loggedIn={loggedIn} />
            <section className="profile">
                <h2 className="profile__welcome">
                    Привет, {userData.name}!
                </h2>
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
                    <span className="profile__input-error">
                        {apiResponseMessage}
                    </span>
                    <button
                        type="submit"
                        className={
                            isValid && isValuesNotMatched
                                ? "profile__button"
                                : "profile__button profile__button_disable"
                        }
                        onClick={handleOnSubmit}
                        disabled={!isValid && !isValuesNotMatched}
                    >
                        {isValid && isValuesNotMatched
                            ? "Сохранить"
                            : "Редактировать"}
                    </button>
                    <button
                        type="button"
                        className="profile__button profile__button_logout"
                        role="link"
                        onClick={onLogOut}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </section>
        </>
    );
}

export default Profile;
