import React from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="search">
            <form className="search__form">
                <input
                    className="search__input"
                    name="movie"
                    type="text"
                    placeholder="Фильм"
                    minLength="1"
                    maxLength="200"
                    required
                    autoComplete="off"
                />
                <button className="search__button" />
            </form>
            <ToggleSwitch />
        </section>
    );
}

export default SearchForm;
