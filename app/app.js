const inputField = document.querySelector(".input-city");
const inputSection = document.querySelector(".input-section");
const cityOfChoice = document.querySelector(".city-of-choice");
const weatherOfCity = document.querySelector(".weather-of-city");
const weatherDesc = document.querySelector(".weather-description");
const temperatureOfCity = document.querySelector(".temperature-of-city");
const errorResponse = document.querySelector(".wrong");

import { OW_API_KEY } from "./API_key.js";

inputField.addEventListener("keyup", (e) => {
    if (inputField.value === "") {
        inputSection.classList.remove("vh");
        inputField.classList.remove("input-submitted");
    }

    if (e.keyCode === 13) {
        errorResponse.classList.remove("error-response");
        errorResponse.classList.add("wrong");
        let city = inputField.value.toLowerCase();
        city = city.charAt(0).toUpperCase() + city.slice(1);

        cityOfChoice.innerHTML = city;
        const openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q="
            + city + "&appid=" + OW_API_KEY + "&units=metric";

        fetch(openWeatherURL)
            .then(handleErrors)
            .then((response) => response.json())
            .then((data) => {
                inputField.classList.add("input-submitted");
                inputSection.classList.add("vh");
                const temperature = Math.round(data.main.temp);
                const temperatureInF = Math.round((temperature * 9 / 5) + 32);
                const weather = data.weather[0].main;
                const weatherDescription = data.weather[0].description;

                temperatureOfCity.innerHTML = "Temperature: " + temperature + "°C / " + temperatureInF + "°F";
                weatherOfCity.innerHTML = weather;
                weatherDesc.innerHTML = weatherDescription;
            })
            .catch((error) => {
                console.log(error);
            });
    }
});

function handleErrors(response) {
    if (!response.ok) {
        errorResponse.classList.add("error-response");
        errorResponse.classList.remove("wrong");
        throw Error(response.statusText);
    }
    return response;
}