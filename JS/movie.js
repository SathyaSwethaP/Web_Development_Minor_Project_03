// OMDb API
const API_KEY = "40fb556e";

const movieAPI = "https://www.omdbapi.com/";


// Search movies
export const searchMovies = async (movieName) => {

    const response = await fetch(
        `${movieAPI}?apikey=${API_KEY}&s=${encodeURIComponent(movieName)}&type=movie`
    );

    if (!response.ok) {
        throw new Error("Unable to connect to the movie service.");
    }

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(
            data.Error || "No movies found."
        );
    }

    return data.Search;
};


// Get complete movie details
export const getMovieDetails = async (imdbID) => {

    const response = await fetch(
        `${movieAPI}?apikey=${API_KEY}&i=${imdbID}&plot=short`
    );

    if (!response.ok) {
        throw new Error("Unable to get movie details.");
    }

    const data = await response.json();

    if (data.Response === "False") {
        throw new Error(
            data.Error || "Movie details not found."
        );
    }

    return data;
};