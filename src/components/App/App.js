import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    return (
        <>
            <Header />

            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>

                <Route path="/sign-up">
                    <Register/>
                </Route>

                <Route path="/sign-in">
                    <Login/>
                </Route>

                <Route path="/profile">
                    <Profile/>
                </Route>

                <Route path="/movies">
                    <Movies/>
                </Route>
                
                <Route path="/savedmovies">
                    <SavedMovies/>
                </Route>

                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>

            <Footer />
        </>
    );
}

export default App;
