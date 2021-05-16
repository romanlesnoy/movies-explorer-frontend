import React from "react";
import "./MoviesCardList.css";
import MoviesCards from "../MoviesCards/MoviesCards";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ foundMovies, isLoading, badResponse }) {
    console.log(foundMovies, "результат в списке фильмов");
    return (
        <section className="movies-card-list">
            <div className="movies-card-list__elements">
                <MoviesCards />
                <MoviesCards />
                <MoviesCards />
                <MoviesCards />
                <MoviesCards />
                <MoviesCards />{" "}
            </div>
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
