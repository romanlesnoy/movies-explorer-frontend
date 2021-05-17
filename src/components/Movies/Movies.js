import React from "react";
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
    foundMovies,
    setPreloader,
    badResponse,
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
                <div className="movies">
                {isLoading && <Preloader />}
                {badResponse ? foundMovies.length === 0 && (
                    <p className="movie__response">{badResponse}</p>
                ) : <p className="movie__response">Нужно ввести ключевое слово</p>}
                {foundMovies.length !== 0 && (<MoviesCardList
                    foundMovies={foundMovies}
                    toggleMovieLike={toggleMovieLike}
                    checkBookmarkStatus={checkBookmarkStatus}
                />)}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Movies;
