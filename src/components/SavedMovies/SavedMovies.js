import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies() {
    return (
        <>
            <Header />
            <main>
                <SearchForm />
                <MoviesCardList />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;
