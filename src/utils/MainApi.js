// const BASE_URL = "https://api.movies-explorer.nomoredomains.icu";
const BASE_URL = "http://localhost:3001";

const response = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
};

export const createProfile = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    }).then(response);
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    }).then(response);
};

export const getUser = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(response);
};

export const updateProfile = ({ name, email }) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email, name: name }),
    }).then(response);
};

export const createMovie = (data) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: data.image,
            trailer: data.trailer,
            thumbnail: data.thumbnail,
            movieId: data.movieId,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
        }),
    }).then(response);
};

export const deleteMovie = (movieId) => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(response);
};

export const getUserMovies = () => {
    const token = localStorage.getItem("jwt");
    return fetch(`${BASE_URL}/movies`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then(response);
};
