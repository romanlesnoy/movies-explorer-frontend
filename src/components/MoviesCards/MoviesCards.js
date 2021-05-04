import React from "react";
import "./MoviesCards.css";

function MoviesCards() {
    return (
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movie-card__info">
                    <h3 className="movies-card__name">Shut Up and Play the Hits</h3>
                    <p className="movies-card__duration">1ч 47м</p>
                </div>
                <button
                    className="movies-card__bookmark-button"
                    type="button"
                    aria-label="Bookmark Buttom"
                ></button>
            </div>
            <img
                className="movies-card__images"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Shut_Up_and_Play_the_Hits.jpg/220px-Shut_Up_and_Play_the_Hits.jpg"
                alt="Shut Up and Play the Hits preview"
            />
        </article>
    );
}

export default MoviesCards;
