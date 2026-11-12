document.addEventListener("DOMContentLoaded", () => {

    const homePage = document.getElementById("homePage");
    const weatherPage = document.getElementById("weatherPage");
    const moviePage = document.getElementById("moviePage");

    const weatherChoice = document.getElementById("weatherChoice");
    const movieChoice = document.getElementById("movieChoice");

    const weatherBack = document.getElementById("weatherBack");
    const movieBack = document.getElementById("movieBack");


    // Open Weather Page

    weatherChoice.addEventListener("click", () => {

        homePage.classList.add("hidden");
        moviePage.classList.add("hidden");

        weatherPage.classList.remove("hidden");

        window.scrollTo(0, 0);

    });


    // Open Movie Page

    movieChoice.addEventListener("click", () => {

        homePage.classList.add("hidden");
        weatherPage.classList.add("hidden");

        moviePage.classList.remove("hidden");

        window.scrollTo(0, 0);

    });


    // Back to Home from Weather

    weatherBack.addEventListener("click", () => {

        weatherPage.classList.add("hidden");

        homePage.classList.remove("hidden");

        window.scrollTo(0, 0);

    });


    // Back to Home from Movies

    movieBack.addEventListener("click", () => {

        moviePage.classList.add("hidden");

        homePage.classList.remove("hidden");

        window.scrollTo(0, 0);

    });

});