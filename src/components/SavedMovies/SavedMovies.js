import React from "react";
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
    foundMovies,
    setPreloader,
    moviesSearchResponse,
    toggleMovieLike,
    checkBookmarkStatus,
}) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm
                    handleSearch={onSubmitSearch}
                    setPreloader={setPreloader}
                />
                <div className="saved-movies">
                    {isLoading && <Preloader />}
                    {moviesSearchResponse ? foundMovies.length === 0 && (
                        <p className="saved-movie__response">{moviesSearchResponse}</p>
                    ) : foundMovies.length === 0 && (
                        <p className="saved-movie__response">
                            Нет сохраненных фильмов
                        </p>
                    )}

                    {foundMovies.length !== 0 && (
                        <MoviesCardList
                            foundMovies={foundMovies}
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

export default SavedMovies;
