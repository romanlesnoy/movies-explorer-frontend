import React from "react";
import "./MoviesCardList.css";
import MoviesCards from "../MoviesCards/MoviesCards";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(isLoading) {
    return (
        <section className="movies-card-list">
            {isLoading ? (
                <Preloader />
            ) : (
                <div className="movies-card-list__elements">
                    <MoviesCards />
                    <MoviesCards />
                    <MoviesCards />
                    <MoviesCards />
                    <MoviesCards />
                    <MoviesCards />
                </div>
            )}
            <button
                className="movies-card-list__more-button"
                aria-label="Load more movies"
            >
                Ещё
            </button>
        </section>
    );
}

export default MoviesCardList;
