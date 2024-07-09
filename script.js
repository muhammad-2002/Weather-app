const apiKey = '3fe84630b67d4a59871103435240807'; 

let forecastData = [];

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    if (!city) {
        document.getElementById('weatherData').innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            forecastData = data.forecast.forecastday;
            displayWeather(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('weatherData').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const weatherData = `
        <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather Icon">
        <div class="weather-forecast weather-content">
            
            ${forecastData.map(day => `
                <div class=''>
                    <p>${day.date}</p>
                    <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                    <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    <p>Condition: ${day.day.condition.text}</p>
                    <img src="${day.day.condition.icon}" alt="Weather Icon">
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('weatherData').innerHTML = weatherData;
}

function sortWeather() {
    const sortBy = document.getElementById('sort').value;

    if (sortBy === 'date') {
        forecastData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'temp') {
        forecastData.sort((a, b) => a.day.maxtemp_c - b.day.maxtemp_c);
    }

    displaySortedWeather();
}

function displaySortedWeather() {
    const weatherData = `
        <div class="weather-forecast">
            <h3>3 Day Forecast</h3>
            <div class='card-content'>
            ${forecastData.map(day => `
                <div>
                    <p>${day.date}</p>
                    <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                    <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    <p>Condition: ${day.day.condition.text}</p>
                    <img src="${day.day.condition.icon}" alt="Weather Icon">
                </div>
            `).join('')}
            </div>
        </div>
    `;
    document.getElementById('weatherData').innerHTML = weatherData;
}
