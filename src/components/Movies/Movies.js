import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies({
    loggedIn,
    isLoading,
    onSubmitSearch,
    movies,
    setPreloader,
    moviesSearchResponse,
    toggleMovieLike,
    checkBookmarkStatus,
    setIsChecked,
    isChecked,
    sortShortMovies,
}) {
    const [shortMovies, setShortMovies] = useState([]);

    useEffect(() => {
        if (isChecked) {
            setShortMovies(sortShortMovies(movies));
        }
    }, [isChecked]);

    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm
                    handleSearch={onSubmitSearch}
                    setPreloader={setPreloader}
                    setIsChecked={setIsChecked}
                />
                <div className="movies">
                    {isLoading && <Preloader />}

                    {moviesSearchResponse
                        ? movies.length === 0 && (
                            <p className="movie__response">
                                {moviesSearchResponse}
                            </p>
                        )
                        : movies.length === 0 && (
                            <p className="movie__response">
                                Нужно ввести ключевое слово
                            </p>
                        )}

                    {isChecked &&
                        movies.length !== 0 &&
                        shortMovies.length === 0 && (
                            <p className="movie__response">
                                Среди фильмов нет короткометражек
                            </p>
                        )}

                    {movies.length !== 0 && (
                        <MoviesCardList
                            movies={isChecked ? shortMovies : movies}
                            toggleMovieLike={toggleMovieLike}
                            checkBookmarkStatus={checkBookmarkStatus}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Movies;
