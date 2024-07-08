document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeatherData(city);
  });
  
  function fetchWeatherData(city) {
    const apiKey = '3fe84630b67d4a59871103435240807'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => displayWeatherData(data))
      .catch(error => displayError(error));
  }
  
  function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.region}</h2>
      <p>${data.current.temp_c}°C</p>
      <p>${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="Weather Icon">
    `;
  }
  
  function displayError(error) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
  