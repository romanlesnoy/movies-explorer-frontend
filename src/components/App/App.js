import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Main loggedIn={false}/>
                </Route>

                <Route path="/sign-up">
                    <Register />
                </Route>

                <Route path="/sign-in">
                    <Login />
                </Route>

                <Route path="/profile">
                    <Profile loggedIn={true}/>
                </Route>

                <Route path="/movies">
                    <Movies loggedIn={true}/>
                </Route>

                <Route path="/saved-movies">
                    <SavedMovies loggedIn={true}/>
                </Route>

                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default App;
