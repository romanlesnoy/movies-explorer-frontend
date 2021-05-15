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
import { register, login, getUser, updateUser } from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import {
    CONFLICT_EMAIL_MESSAGE,
    INVALID_DATA_MESSAGE,
    AUTH_DATA_ERROR_MESSAGE,
    SERVER_ERROR_MESSAGE,
    MOVIES_SERVER_ERROR_MESSAGE,
    MOVIES_NOT_FOUND_MESSAGE,
    SUCCSESS_UPDATE_MESSAGE,
    SUCCSESS_DELETE_MESSAGE,
    SUCCSESS_CREATE_MESSAGE,
} from "../../utils/responseMessages";

function App() {
    const [currentUser, setCurrentUser] = useState({
        name: "",
        email: "",
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponseMessage, setResponseMessage] = useState(" ");
    const history = useHistory();
    let location = useLocation().pathname;

    const showResponseMessageTimer = (error) => {
        setResponseMessage(error);
        setTimeout(() => setResponseMessage(""), 3000);
    };

    const tokenCheck = () => {
        const token = localStorage.getItem("jwt");
        if (token) {
            getUser(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setCurrentUser(res);
                        history.push(location);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    localStorage.removeItem("token");
                    history.push("/");
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
                if (err === "Error 400") {
                    return showResponseMessageTimer(
                        INVALID_DATA_MESSAGE
                    );
                }
                if (err === "Error 409") {
                    return showResponseMessageTimer(
                        CONFLICT_EMAIL_MESSAGE
                    );
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
                    return showResponseMessageTimer(
                        INVALID_DATA_MESSAGE
                    );
                }
                if (err === "Error 401") {
                    return showResponseMessageTimer(
                        AUTH_DATA_ERROR_MESSAGE
                    );
                }
                console.log(err);
            });
    };

    const handleUpdateUser = (userData) => {
        updateUser(userData)
            .then((res) => {
                if (res) {
                    setCurrentUser({
                        ...currentUser,
                        name: res.newName,
                        email: res.newEmail,
                    });
                    showResponseMessageTimer(SUCCSESS_UPDATE_MESSAGE);
                }
            })
            .catch((err) => {
                showResponseMessageTimer(
                    SERVER_ERROR_MESSAGE
                );
                console.log(err);
            });
    };

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("BeatsMovies");
        localStorage.removeItem("keyword");
        setLoggedIn(false);
        history.push("/");
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    //Movies

    const [allMovies, setAllmovies] = useState([]);
    const [moviesBadResponse, setMoviesBadResponse] = useState("");

    function getBeatMovies() {
        getMovies()
            .then((data) => {
                const moviesArray = data.map((item) => {
                    const imageURL = item.image ? item.image.url : "";
                    const thumbnailURL = item.image
                        ? item.image.formats.thumbnail.url
                        : "";
                    return {
                        country: item.country,
                        director: item.director,
                        duration: item.duration,
                        year: item.year,
                        description: item.description,
                        image: `https://api.nomoreparties.co${imageURL}`,
                        trailer: item.trailerLink,
                        thumbnail: `https://api.nomoreparties.co${thumbnailURL}`,
                        movieId: item.id,
                        nameRU: item.nameRU,
                        nameEN: item.nameEN,
                    };
                });
                localStorage.setItem("movies", JSON.stringify(moviesArray));
                setAllmovies(moviesArray);
            })
            .catch((err) => {
                localStorage.removeItem("BeatsMovies");
                setMoviesBadResponse(
                    MOVIES_SERVER_ERROR_MESSAGE
                );
                console.log(err);
            });
    }

    function moviesSearch (keyword, checked) {
        console.log(keyword);
        console.log(checked);
    }

    useEffect(() => {
        const BeatsMovies = JSON.parse(localStorage.getItem("BeatsMovies"));
        if (BeatsMovies) {
            setAllmovies(BeatsMovies);
        } else {
            getBeatMovies();
        }
    }, []);

    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route exact path="/">
                        <Main loggedIn={loggedIn} />
                    </Route>

                    <Route path="/sign-up">
                        <Register
                            onRegister={handleRegister}
                            apiResponseMessage={apiResponseMessage}
                        />
                    </Route>

                    <Route path="/sign-in">
                        <Login
                            onLogin={handleLogin}
                            apiResponseMessage={apiResponseMessage}
                        />
                    </Route>

                    <ProtectedRoute
                        path="/profile"
                        loggedIn={loggedIn}
                        component={Profile}
                        userData={currentUser}
                        apiResponseMessage={apiResponseMessage}
                        onEditProfile={handleUpdateUser}
                        onLogOut={handleLogOut}
                    />

                    <ProtectedRoute
                        path="/movies"
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        moviesSearch={moviesSearch}
                        component={Movies}

                    />

                    <ProtectedRoute
                        path="/saved-movies"
                        loggedIn={loggedIn}
                        isLoading={isLoading}
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
