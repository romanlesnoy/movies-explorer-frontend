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
    const [apiError, setApiError] = useState(" ");
    const history = useHistory();
    let location = useLocation().pathname;

    const showApiErrorTimer = (error) => {
        setApiError(error);
        setTimeout(() => setApiError(''), 3000);
    };

    const tokenCheck = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            getUser(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        history.push(location);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem('token');
                    history.push('/');
                });
        }
    };

    const handleRegister = ({ name, email, password }) => {
        register(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password);
                }
            })
            .catch((err) => {
                setApiError(err.message);
                if (err === "Error 400") {
                    return showApiErrorTimer("Не верно заполнено одно из поле");
                }
                if (err === "Error 409") {
                    return showApiErrorTimer("Такой пользователь уже существует");
                }
                console.log(err);
            });
    };

    const handleLogin = (email, password) => {
        login(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    history.push("/movies");
                }
            })
            .catch((err) => {
                if (err === "Error 400") {
                    return showApiErrorTimer("Не верно заполнено одно из поле");
                }
                if (err === "Error 401") {
                    return showApiErrorTimer("Неправильные почта или пароль");
                }
                console.log(err);
            });
    };

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/");
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route exact path="/">
                        <Main loggedIn={loggedIn} />
                    </Route>

                    <Route path="/sign-up">
                        <Register onRegister={handleRegister} apiError={apiError}/>
                    </Route>

                    <Route path="/sign-in">
                        <Login onLogin={handleLogin} apiError={apiError}/>
                    </Route>

                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        onLogOut={handleLogOut}
                    />

                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        component={Movies}
                    />

                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        component={SavedMovies}
                    />

                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
