import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import { register, login, getUser } from "../../utils/MainApi";

function App() {
    const [currentUser, setCurrentUser] = useState({});

    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    let location = useLocation()

    const handleRegister = ({name, email, password}) => {
        register(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password)
                }
            })
            .catch((err) => {
                if (err === "Error 400") {
                    return console.log("Не верно заполнено одно из поле");
                }
                if (err === "Error 409") {
                    return console.log("Такой пользователь уже существует");
                }
                console.log(err);
            });
    };

    const handleLogin = (email, password) => {
        console.log(email, password);
        login(email, password)
            .then((res) => {
                console.log(res.token)
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                if (err === "Error 400") {
                    return console.log("Не верно заполнено одно из поле");
                }
                if (err === "Error 401") {
                    return console.log("Неправильные почта или пароль");
                }
                console.log(err);
            });
    };

    useEffect(() => {
        const path = location.pathname;
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            getUser(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        history.push(path);
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/");
    };

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route exact path="/">
                        <Main loggedIn={loggedIn} />
                    </Route>

                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} />
                    </Route>

                    <Route path="/sign-in">
                        <Login onLogin={handleLogin}/>
                    </Route>

                    <ProtectedRoute
                        exact
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        onLogOut={handleLogOut}
                    />

                    <ProtectedRoute
                        exact
                        path="/movies"
                        loggedIn={loggedIn}
                        component={Movies}
                    />

                    <ProtectedRoute
                        exact
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                    />

                    {/* <Route path="/profile">
                        <Profile loggedIn={true} />
                    </Route> */}

                    {/* <Route path="/movies">
                        <Movies loggedIn={true} />
                    </Route> */}

                    {/* <Route path="/saved-movies">
                        <SavedMovies loggedIn={true} />
                    </Route> */}

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
