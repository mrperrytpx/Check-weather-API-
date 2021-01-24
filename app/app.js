const inputSection = document.querySelector(".input-section");
const errorResponse = document.querySelector(".wrong");
const inputField = document.querySelector(".input-city");
const cityOfChoice = document.querySelector(".city-of-choice");
const cityTimezone = document.querySelector(".timezone");
const weatherOfCity = document.querySelector(".weather-of-city");
const weatherDesc = document.querySelector(".weather-description");
const humidity = document.querySelector(".humidity");
const temperatureOfCity = document.querySelector(".temperature-of-city");

// Importing OpenWeather API key from local file
// import { OW_API_KEY } from "./API_key.js";
const OW_API_KEY = "7e5ad3fa25b132d1ffede988a656859a";

// Adding keyup event listener to the input
inputField.addEventListener("keyup", (e) => {
    if (inputField.value === "") {
        inputSection.classList.remove("vh");
        inputField.classList.remove("input-submitted");
    }

    if (e.keyCode === 13) { // Check if the user pressed the Enter key
        errorResponse.classList.remove("error-response");
        errorResponse.classList.add("wrong");

        //Formatting the input so it looks right with multi word cities
        let inputCity = inputField.value.toLowerCase().split(" ");
        let city = [];
        inputCity.forEach(element => {
            let adding = element.charAt(0).toUpperCase() + element.slice(1);
            city.push(adding);
        })
        city = city.join(" ");

        const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric`;

        // Fetching the API request
        fetch(openWeatherURL)
            .then(handleErrors) // Check for errors before proceeding
            .then((response) => response.json()) // Convert the response to JSON data
            .then((data) => {

                inputField.classList.add("input-submitted");
                inputSection.classList.add("vh");

                // Get user's local time
                const date = new Date();
                const hour = date.getHours();
                const minute = date.getMinutes();

                // Some API data
                const country = data.sys.country;
                const temperature = Math.round(data.main.temp);
                const temperatureInF = Math.round((temperature * 9 / 5) + 32);
                const weather = data.weather[0].main;
                const weatherDescription = data.weather[0].description;
                const timezone = (data.timezone) / 3600 - 1;
                const humid = data.main.humidity;
    
                // Calculating proper time for different timezones
                let number;
                if (timezone < 0) {
                    number = hour - Math.abs(timezone);
                    if (number < 0) {
                        number += 24;
                    }
                } else if (timezone > 0) {
                    number = (hour + Math.abs(timezone));
                    if (number > 24) {
                        number -= 24;
                    }
                } else {
                    number = hour;
                }

                // Adding text to HTML elements
                cityOfChoice.innerHTML = `${city}, ${country}`;
                temperatureOfCity.innerHTML = `Temperature: ${temperature}°C / ${temperatureInF}°F.`;
                weatherOfCity.innerHTML = weather;
                weatherDesc.innerHTML = `Description: ${weatherDescription}.`;
                cityTimezone.innerHTML = `Time in ${city}, ${country} - ${number}:${minute}`;
                humidity.innerHTML = `Humidity: ${humid}% humid.`;
            })
            .catch((error) => {
                // If the input isn't valid, display an error
                errorResponse.innerHTML = `Error: "${city}" Not Found. Try again!`
                console.log(error);
            });
    }
});

//Stop fetch from resolving a promise even tho it errored out. Fetch is like a puppy
function handleErrors(response) {
    if (!response.ok) {
        errorResponse.classList.add("error-response");
        errorResponse.classList.remove("wrong");
        throw Error(response.statusText);
    }
    return response;
}