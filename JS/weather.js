// Weather API URL
const weatherAPI = "https://api.open-meteo.com/v1/forecast";

// Search city using Open-Meteo Geocoding API
const getCityCoordinates = async (city) => {

    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!response.ok) {
        throw new Error("Unable to search for the city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please enter a valid city name.");
    }

    // Destructuring
    const {
        latitude,
        longitude,
        name,
        country
    } = data.results[0];

    return {
        latitude,
        longitude,
        name,
        country
    };
};


// Get weather information
export const getWeather = async (city) => {

    // Get city coordinates
    const {
        latitude,
        longitude,
        name,
        country
    } = await getCityCoordinates(city);

    // Fetch weather data
    const response = await fetch(
        `${weatherAPI}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!response.ok) {
        throw new Error("Unable to get weather information.");
    }

    const data = await response.json();

    // Destructuring weather data
    const {
        temperature_2m: temperature,
        relative_humidity_2m: humidity,
        weather_code: weatherCode,
        wind_speed_10m: windSpeed
    } = data.current;

    return {
        name,
        country,
        temperature,
        humidity,
        weatherCode,
        windSpeed
    };
};


// Convert weather code into readable text
export const getWeatherDescription = (code) => {

    if (code === 0) {
        return "Clear Sky ☀️";
    }

    if (code === 1 || code === 2 || code === 3) {
        return "Partly Cloudy 🌤️";
    }

    if (code === 45 || code === 48) {
        return "Foggy 🌫️";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle 🌦️";
    }

    if (code >= 61 && code <= 67) {
        return "Rainy 🌧️";
    }

    if (code >= 71 && code <= 77) {
        return "Snowy ❄️";
    }

    if (code >= 80 && code <= 82) {
        return "Rain Showers 🌧️";
    }

    if (code >= 95) {
        return "Thunderstorm ⛈️";
    }

    return "Unknown Weather";
};