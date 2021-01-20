const inputField = document.querySelector(".input-city");
const submitButton = document.querySelector(".submit-button");
const cityOfChoice = document.querySelector(".city-of-choice");
const weatherOfCity = document.querySelector(".weather-of-city");
const weatherDesc = document.querySelector(".weather-description");
const temperatureOfCity = document.querySelector(".temperature-of-city");

import { OW_API_KEY } from "./API_key.js";


submitButton.addEventListener("click", (e) => {
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
        })
        .catch((error) => {
            console.log(error);
        });
    
});