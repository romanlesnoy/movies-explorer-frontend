import React, { useEffect, useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
    loggedIn,
    isLoading,
    onSubmitSearch,
    movies,
    setPreloader,
    moviesSearchResponse,
    toggleMovieLike,
    checkBookmarkStatus,
    isChecked,
    setIsChecked,
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
                <div className="saved-movies">
                    {isLoading && <Preloader />}
                    {moviesSearchResponse
                        ? movies.length === 0 && (
                            <p className="saved-movie__response">
                                {moviesSearchResponse}
                            </p>
                        )
                        : movies.length === 0 && (
                            <p className="saved-movie__response">
                                Нет сохраненных фильмов
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
                            isSavedPage={true}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
