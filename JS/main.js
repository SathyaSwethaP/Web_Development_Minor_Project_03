import {
    getWeather,
    getWeatherDescription
} from "./weather.js";

import {
    searchMovies
} from "./movie.js";


// Get HTML elements
const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");


// Display weather information
const displayWeather = (weather) => {

    const {
        name,
        country,
        temperature,
        humidity,
        windSpeed,
        weatherCode
    } = weather;

    const description = getWeatherDescription(weatherCode);

    let weatherIcon = "🌤️";

    if (weatherCode === 0) {
        weatherIcon = "☀️";
    } else if (weatherCode <= 3) {
        weatherIcon = "🌤️";
    } else if (weatherCode === 45 || weatherCode === 48) {
        weatherIcon = "🌫️";
    } else if (weatherCode >= 51 && weatherCode <= 57) {
        weatherIcon = "🌦️";
    } else if (weatherCode >= 61 && weatherCode <= 67) {
        weatherIcon = "🌧️";
    } else if (weatherCode >= 71 && weatherCode <= 77) {
        weatherIcon = "❄️";
    } else if (weatherCode >= 80 && weatherCode <= 82) {
        weatherIcon = "🌧️";
    } else if (weatherCode >= 95) {
        weatherIcon = "⛈️";
    }

    weatherResult.innerHTML = `

        <div class="wx-dashboard">

            <div class="wx-location">
                <span>📍</span>
                <h2>${name}, ${country}</h2>
            </div>

            <div class="wx-main">

                <div class="wx-icon">
                    ${weatherIcon}
                </div>

                <div class="wx-temperature">
                    ${Math.round(temperature)}<span>°C</span>
                </div>

                <p class="wx-condition">
                    ${description}
                </p>

                <p class="wx-caption">
                    Current Weather Conditions
                </p>

            </div>

            <div class="wx-stats">

                <div class="wx-stat-card">
                    <span class="wx-stat-icon">💧</span>
                    <p>Humidity</p>
                    <h3>${humidity}%</h3>
                </div>

                <div class="wx-stat-card">
                    <span class="wx-stat-icon">💨</span>
                    <p>Wind Speed</p>
                    <h3>${windSpeed} km/h</h3>
                </div>

            </div>

        </div>
    `;
};


// Display error message
const displayWeatherError = (message) => {

    weatherResult.innerHTML = `
        <div class="error-message">
            ❌ ${message}
        </div>
    `;
};


// Handle weather form submission
weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = cityInput.value.trim();

    // Check empty input
    if (city === "") {

        displayWeatherError(
            "Please enter a city name."
        );

        return;
    }


    // Show loading message
    weatherResult.innerHTML = `
        <p class="default-message">
            🔄 Loading weather information...
        </p>
    `;


    try {

        // Call weather API
        const weather = await getWeather(city);

        // Display result
        displayWeather(weather);

    } catch (error) {

        // Handle errors
        displayWeatherError(error.message);

    }

});


// ==========================================
// MOVIE SEARCH APP
// ==========================================


// Get movie HTML elements
const movieForm = document.getElementById("movieForm");
const movieInput = document.getElementById("movieInput");
const movieResult = document.getElementById("movieResult");


// Display movies
const displayMovies = (movies) => {

    movieResult.innerHTML = movies.map(movie => {

        const {
            Title,
            Year,
            Poster,
            imdbID
        } = movie;

        const posterImage =
            Poster !== "N/A"
                ? Poster
                : "https://via.placeholder.com/300x450?text=No+Poster";


        return `
            <div class="movie-card">

                <img
                    src="${posterImage}"
                    alt="${Title}"
                >

                <div class="movie-info">

                    <h3>${Title}</h3>

                    <p>
                        <strong>Release:</strong>
                        ${Year}
                    </p>

                    <button
                        class="details-button"
                        data-id="${imdbID}">
                        View Details
                    </button>

                </div>

            </div>
        `;

    }).join("");
};


// Display movie error
const displayMovieError = (message) => {

    movieResult.innerHTML = `
        <div class="error-message">
            ❌ ${message}
        </div>
    `;
};


// Movie form submit
movieForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const movieName = movieInput.value.trim();


    // Empty input
    if (movieName === "") {

        displayMovieError(
            "Please enter a movie name."
        );

        return;
    }


    // Loading
    movieResult.innerHTML = `
        <p class="default-message">
            🔄 Searching for movies...
        </p>
    `;


    try {

        const movies = await searchMovies(movieName);

        displayMovies(movies);

    } catch (error) {

        displayMovieError(error.message);

    }

});