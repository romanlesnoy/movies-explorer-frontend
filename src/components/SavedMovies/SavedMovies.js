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
    badResponse,
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
            {badResponse ? foundMovies.length === 0 && (
                <p className="saved-movie__response">{badResponse}</p>
            ) : <p className="saved-movie__response">Нужно ввести ключевое слово</p>}
            {foundMovies.length !== 0 && (<MoviesCardList
                foundMovies={foundMovies}
            />)}
            </div>
        </main>
        <Footer />
    </>
    );
}

export default SavedMovies;
