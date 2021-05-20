import React from "react";
import "./MoviesCardList.css";
import MoviesCards from "../MoviesCards/MoviesCards";
import {
    LARGE_SCREEN_RESOLUTION,
    MEDIUM_SCREEN_RESOLUTION,
    MAX_NUMBER_MOVIES,
    MID_NUMBER_MOVIES,
    MIN_NUMBER_MOVIES,
    ADD_MAX_NUMBER_MOVIES,
    ADD_MIN_NUMBER_MOVIES,
} from "../../utils/constants";

function MoviesCardList({
    movies,
    toggleMovieLike,
    checkBookmarkStatus,
    isSavedPage,
}) {
    const [extraPortion, setExtraPortion] = React.useState(3);
    const [currentCount, setCurrenCount] = React.useState(0);
    const [renderMovies, setRenderMovies] = React.useState([]);

    function getCount(windowSize) {
        if (windowSize > LARGE_SCREEN_RESOLUTION) {
            return { first: MAX_NUMBER_MOVIES, extra: ADD_MAX_NUMBER_MOVIES };
        } else if (
            windowSize > MEDIUM_SCREEN_RESOLUTION &&
            windowSize <= LARGE_SCREEN_RESOLUTION
        ) {
            return { first: MID_NUMBER_MOVIES, extra: ADD_MIN_NUMBER_MOVIES };
        } else {
            return { first: MIN_NUMBER_MOVIES, extra: ADD_MIN_NUMBER_MOVIES };
        }
    }

    function renderExtraPortion() {
        const count = Math.min(movies.length, currentCount + extraPortion);
        const extraMovies = movies.slice(currentCount, count);
        setRenderMovies([...renderMovies, ...extraMovies]);
        setCurrenCount(count);
    }

    function handleResize() {
        const windowSize = window.innerWidth;
        const sizePortion = getCount(windowSize);
        setExtraPortion(sizePortion.extra);
    }

    React.useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    React.useEffect(() => {
        const windowSize = window.innerWidth;
        const sizePortion = getCount(windowSize);
        setExtraPortion(sizePortion.extra);
        const count = Math.min(movies.length, sizePortion.first);
        setRenderMovies(movies.slice(0, count));
        setCurrenCount(count);
    }, [movies]);

    function handleMoreCards() {
        renderExtraPortion();
    }

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__elements">
                {isSavedPage &&
                    movies.map((movie) => (
                        <MoviesCards
                            key={movie.movieId}
                            movie={movie}
                            onLikeClick={toggleMovieLike}
                            checkBookmarkStatus={checkBookmarkStatus}
                        />
                    ))}

                {!isSavedPage &&
                    renderMovies.map((movie) => (
                        <MoviesCards
                            key={movie.movieId}
                            movie={movie}
                            onLikeClick={toggleMovieLike}
                            checkBookmarkStatus={checkBookmarkStatus}
                        />
                    ))}
            </div>

            {!isSavedPage && currentCount < movies.length && (
                <button
                    className="movies-card-list__more-button"
                    aria-label="Load more movies"
                    onClick={handleMoreCards}
                >
                    Ещё
                </button>
            )}
        </section>
    );
}

export default MoviesCardList;
