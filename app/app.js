const inputSection = document.querySelector(".input-section");
const errorResponse = document.querySelector(".wrong");
const inputField = document.querySelector(".input-city");
const cityOfChoice = document.querySelector(".city-of-choice");
const cityTimezone = document.querySelector(".timezone");
const weatherOfCity = document.querySelector(".weather-of-city");
const weatherDesc = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity");
const temperatureOfCity = document.querySelector(".temperature-of-city");

import { OW_API_KEY } from "./API_key.js";

inputField.addEventListener("keyup", (e) => {
    if (inputField.value === "") {
        inputSection.classList.remove("vh");
        inputField.classList.remove("input-submitted");
    }

    if (e.keyCode === 13) {
        errorResponse.classList.remove("error-response");
        errorResponse.classList.add("wrong");

        let inputCity = inputField.value.toLowerCase();
        inputCity = inputCity.split(" ");
        let city = [];
        for (let i = 0; i < inputCity.length; i++) {
            let adding = inputCity[i].charAt(0).toUpperCase() + inputCity[i].slice(1);
            city.push(adding);
        }
        city = city.join(" ");
        const openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q="
            + city + "&appid=" + OW_API_KEY + "&units=metric";

        fetch(openWeatherURL)
            .then(handleErrors)
            .then((response) => response.json())
            .then((data) => {
                const date = new Date();
                const hour = date.getHours();
                const minute = date.getMinutes();

                inputField.classList.add("input-submitted");
                inputSection.classList.add("vh");

                const country = data.sys.country;
                const temperature = Math.round(data.main.temp);
                const temperatureInF = Math.round((temperature * 9 / 5) + 32);
                const weather = data.weather[0].main;
                const weatherDescription = data.weather[0].description;
                const timezone = (data.timezone) / 3600 - 1;
                const humid = data.main.humidity;

                let number;
                timezone < 0 ? number = hour - Math.abs(timezone)
                    : timezone > 0 ? number = (hour + Math.abs(timezone)) - 24
                        : number = hour;

                cityOfChoice.innerHTML = `${city}, ${country}`;
                temperatureOfCity.innerHTML = `Temperature: ${temperature}°C / ${temperatureInF}°F.`;
                weatherOfCity.innerHTML = weather;
                weatherDesc.innerHTML = `Description: ${weatherDescription}.`;
                cityTimezone.innerHTML = `Time in ${city}, ${country} - ${number}:${minute}`;
                humidity.innerHTML = `Humidity: ${humid}% humid.`;
            })
            .catch((error) => {
                errorResponse.innerHTML = `Error: "${city}" Not Found. Try again!`
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