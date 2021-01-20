const inputField = document.querySelector(".input-city");
const submitButton = document.querySelector(".submit-button");
const cityOfChoice = document.querySelector(".city-of-choice");
const weatherOfCity = document.querySelector(".weather-of-city");
const temperatureOfCity = document.querySelector(".temperature-of-city");

import { OW_API_KEY, GOOGLE_API_KEY} from "./API_key.js";


submitButton.addEventListener("click", (e) => {
    let city = inputField.value;
    console.log(city);
    const openWeatherURL =
        "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + OW_API_KEY + "&units=metric";
    fetch(openWeatherURL)
        .then((response) => response.json())
        .then((data) => {
            const temperature = Math.round(data.main.temp);
            const temperatureInF = Math.round((temperature * 9/5) + 32);
            const weather = data.weather[0].main;
            const weatherDescription = data.weather[0].description;

            temperatureOfCity.innerHTML = temperature + "°C / " + temperatureInF + "°F";
            weatherOfCity.innerHTML = weather;

            console.log(data);



        })

        .catch((error) => {
            console.log(error);
        });
});
