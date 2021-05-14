import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ loggedIn, isLoading }) {
    return (
        <>
            <Header loggedIn={loggedIn} />
            <main>
                <SearchForm />
                <MoviesCardList isLoading={isLoading} />
            </main>
            <Footer />
        </>
    );
}

export default Movies;
