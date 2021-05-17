import React from "react";
import "./MoviesCardList.css";
import MoviesCards from "../MoviesCards/MoviesCards";

function MoviesCardList({ foundMovies }) {
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
        const count = Math.min(foundMovies.length, currentCount + extraPortion);
        const extraMovies = foundMovies.slice(currentCount, count);
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
        const count = Math.min(foundMovies.length, sizePortion.first);
        setRenderMovies(foundMovies.slice(0, count));
        setCurrenCount(count);
    }, [foundMovies]);

    function handleMoreCards() {
        renderExtraPortion();
    }

    return (
        <section className="movies-card-list">
            <div className="movies-card-list__elements">
                {renderMovies.map((movie) => (
                    <MoviesCards key={movie.movieId} movie={movie} />
                ))}
            </div>
            {currentCount < foundMovies.length && <button
                className="movies-card-list__more-button"
                aria-label="Load more movies"
                onClick={handleMoreCards}
            >
                Ещё
            </button>}
        </section>
    );
}

export default MoviesCardList;
