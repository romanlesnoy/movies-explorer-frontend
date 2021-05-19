import React from "react";
import "./MoviesCardList.css";
import MoviesCards from "../MoviesCards/MoviesCards";

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
        if (windowSize > 768) {
            return { first: 12, extra: 3 };
        } else if (windowSize > 660 && windowSize <= 768) {
            return { first: 8, extra: 2 };
        } else {
            return { first: 5, extra: 2 };
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
