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
import {
    createProfile,
    login,
    getUser,
    updateProfile,
    createMovie,
    deleteMovie,
    getUserMovies,
} from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import {
    CONFLICT_EMAIL_MESSAGE,
    INVALID_DATA_MESSAGE,
    AUTH_DATA_ERROR_MESSAGE,
    SERVER_ERROR_MESSAGE,
    MOVIES_SERVER_ERROR_MESSAGE,
    MOVIES_NOT_FOUND_MESSAGE,
    SUCCSESS_UPDATE_MESSAGE,
    IMAGE_NOT_FOUND,
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
        createProfile(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password);
                }
            })
            .catch((err) => {
                if (err === "Error 400") {
                    return showResponseMessageTimer(INVALID_DATA_MESSAGE);
                }
                if (err === "Error 409") {
                    return showResponseMessageTimer(CONFLICT_EMAIL_MESSAGE);
                }
                if (err === "Error 500") {
                    return showResponseMessageTimer(SERVER_ERROR_MESSAGE);
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
                    return showResponseMessageTimer(INVALID_DATA_MESSAGE);
                }
                if (err === "Error 401") {
                    return showResponseMessageTimer(AUTH_DATA_ERROR_MESSAGE);
                }
                if (err === "Error 500") {
                    console.log(SERVER_ERROR_MESSAGE);
                    return showResponseMessageTimer(SERVER_ERROR_MESSAGE);
                }
                console.log(err);
            });
    };

    const handleUpdateUser = (userData) => {
        updateProfile(userData)
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
                showResponseMessageTimer(SERVER_ERROR_MESSAGE);
                console.log(err);
            });
    };

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("movies");
        setShortMovies([]);
        setShortMovies([]);
        setSearchMoviesResult([]);
        setLoggedIn(false);
        history.push("/");
    };

    function showResponseMessageTimer(error) {
        setResponseMessage(error);
        setTimeout(() => setResponseMessage(""), 10000);
    }

    useEffect(() => {
        tokenCheck();
    }, []);

    //Movies

    const [allMovies, setAllmovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [searchMoviesResult, setSearchMoviesResult] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);
    const [moviesBadResponse, setMoviesBadResponse] = useState("");

    function getBeatMovies() {
        getMovies()
            .then((data) => {
                const moviesArray = data.map((item) => {
                    const imageURL = item.image
                        ? `https://api.nomoreparties.co${item.image.url}`
                        : IMAGE_NOT_FOUND;
                    const thumbnailURL = item.image
                        ? `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`
                        : IMAGE_NOT_FOUND;
                    const noAdaptedName = item.nameEN
                        ? item.nameEN
                        : item.nameRU;
                    const countryValue = item.country ? item.country : "none";
                    return {
                        country: countryValue,
                        director: item.director,
                        duration: item.duration,
                        year: item.year,
                        description: item.description,
                        image: imageURL,
                        trailer: item.trailerLink,
                        thumbnail: thumbnailURL,
                        movieId: item.id,
                        nameRU: item.nameRU,
                        nameEN: noAdaptedName,
                    };
                });
                localStorage.setItem("movies", JSON.stringify(moviesArray));
            })
            .catch((err) => {
                setMoviesBadResponse(MOVIES_SERVER_ERROR_MESSAGE);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function getFavoriteMovies() {
        getUserMovies()
            .then((favouriteMovies) => {
                setLikedMovies(favouriteMovies);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function search(data, keyword) {
        const result = data.filter((movie) => {
            return (
                movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.description.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        return result;
    }

    function sortShortMovies(movies) {
        const shortMoviesArray = movies.filter((movie) => movie.duration <= 40);
        return shortMoviesArray;
    }

    const submitSearch = (keyword, checked) => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
        if (checked) {
            setTimeout(() => setIsLoading(false), 2000);
            setSearchMoviesResult(search(shortMovies, keyword));
            if (searchMoviesResult.length === 0) {
                setMoviesBadResponse(MOVIES_NOT_FOUND_MESSAGE);
            }
        } else {
            setSearchMoviesResult(search(allMovies, keyword));
            if (searchMoviesResult.length === 0) {
                setMoviesBadResponse(MOVIES_NOT_FOUND_MESSAGE);
            }
        }
    };

    const addMovie = (movie) => {
        createMovie(movie)
            .then((res) => {
                const newMovie = res.newMovie;
                setLikedMovies([...likedMovies, newMovie]);
                console.log(res.message);
            })
            .catch((err) => console.log(err));
    };

    const removeMovies = (movie) => {
        const movieId = likedMovies.find((item) => item.id === movie.id)._id;
        deleteMovie(movieId)
            .then((res) => {
                const deleteMovie = res.deleteMovie;
                const newlikedMovies = likedMovies.filter(
                    (item) => item.movieId !== deleteMovie.movieId
                );
                setLikedMovies(newlikedMovies);
                console.log(res.message);
            })
            .catch((err) => console.log(err));
    };

    const checkBookmarkStatus = (movie) => {
        console.log(movie, "id film")
        console.log(likedMovies);
        return likedMovies.some((likedMovie) => likedMovie.movieId === movie.movieId);
    }

    const toggleMovieLike = (movie, isLiked) => {
        isLiked ? removeMovies(movie) : addMovie(movie);
        console.log(isLiked, "click");
    };

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem("movies"));
        if (movies) {
            setAllmovies(movies);
            setShortMovies(sortShortMovies(movies));
        } else {
            getBeatMovies();
        }
        getFavoriteMovies();
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
                        component={Movies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        onSubmitSearch={submitSearch}
                        setPreloader={setIsLoading}
                        badResponse={moviesBadResponse}
                        foundMovies={searchMoviesResult}
                        toggleMovieLike={toggleMovieLike}
                        checkBookmarkStatus={checkBookmarkStatus}
                    />

                    <ProtectedRoute
                        path="/saved-movies"
                        component={SavedMovies}
                        loggedIn={loggedIn}
                        isLoading={isLoading}
                        onSubmitSearch={submitSearch}
                        setPreloader={setIsLoading}
                        badResponse={moviesBadResponse}
                        foundMovies={searchMoviesResult}
                        toggleMovieLike={toggleMovieLike}
                        checkBookmarkStatus={checkBookmarkStatus}
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
