import React, { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

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
                    <h1>Регистрация</h1>
                </Route>

                <Route path="/sign-in">
                    <h1>Логин</h1>
                </Route>

                <Route path="/movies">
                    <h1>movies</h1>
                </Route>
                
                <Route path="*">
                    <h1> Страница 404</h1>
                </Route>
            </Switch>

            <Footer />
        </>
    );
}

export default App;
