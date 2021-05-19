import React from "react";
import "./MoviesCards.css";

function MoviesCards({ movie, onLikeClick, checkBookmarkStatus}) {
    const { nameEN, duration, image, trailer } = movie;

    const isLiked = checkBookmarkStatus(movie);

    const durationConverter = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours > 0 ? hours + "ч " : ""}${minutes}м`;
    };

    const cardLikeButtonClassName = `movies-card__bookmark-button ${
        isLiked ? "movies-card__bookmark-button_active" : " "
    }`;

    function handleBookmarkClick() {
        onLikeClick(movie, isLiked);
    }

    return (
        <article className="movies-card">
            <div className="movies-card__container">
                <div className="movie-card__info">
                    <h3 className="movies-card__name">{nameEN}</h3>
                    <p className="movies-card__duration">
                        {durationConverter(duration)}
                    </p>
                </div>
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Bookmark Button"
                    onClick={handleBookmarkClick}
                ></button>
            </div>
            <a href={trailer} target="_blank" rel="noopener noreferrer">
                <img className="movies-card__images" src={image} alt={nameEN} />
            </a>
        </article>
    );
}

export default MoviesCards;
