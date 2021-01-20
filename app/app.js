const inputField = document.querySelector(".input");
const submitButton = document.querySelector(".submit-button");

import API_KEY from "../API_key.js";

submitButton.addEventListener("click", (e) => {
    let city = inputField.value;
    const url =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        API_KEY +
        "&units=metric";
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let weather = data.weather[0].main;
            let temp = Math.round(data.main.temp) + "°C";
            let description = data.weather[0].description;
            console.log(temp);
        })

        .catch((error) => {
            console.log(error);
        });
});

