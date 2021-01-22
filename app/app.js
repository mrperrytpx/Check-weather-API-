const inputField = document.querySelector(".input-city");
const inputSection = document.querySelector(".input-section");
const cityOfChoice = document.querySelector(".city-of-choice");
const weatherOfCity = document.querySelector(".weather-of-city");
const weatherSection = document.querySelector(".display-section")
const weatherDesc = document.querySelector(".weather-description");
const temperatureOfCity = document.querySelector(".temperature-of-city");

import { OW_API_KEY } from "./API_key.js";

inputField.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        inputField.classList.add("input-submitted");
        inputSection.classList.add("vh");

        let city = inputField.value;
        cityOfChoice.innerHTML = city;
        const openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q="
            + city + "&appid=" + OW_API_KEY + "&units=metric";

        fetch(openWeatherURL)
            .then((response) => response.json())
            .then((data) => {
                const temperature = Math.round(data.main.temp);
                const temperatureInF = Math.round((temperature * 9 / 5) + 32);
                const weather = data.weather[0].main;
                const weatherDescription = data.weather[0].description;
                console.log(data);
                temperatureOfCity.innerHTML = "Temperature: " + temperature + "°C / " + temperatureInF + "°F";
                weatherOfCity.innerHTML = weather;
                weatherDesc.innerHTML = weatherDescription;
                weatherSection.classList.add("display-section-transition");
                if (inputField.value === "") {
                    weatherSection.classList.remove("display-section-transition");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
});