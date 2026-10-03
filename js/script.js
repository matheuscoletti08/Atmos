const inputCity = document.querySelector(".input-city");
const searchBtn = document.querySelector(".search-btn");
const cityInfo = document.querySelector(".city");
const temperature = document.querySelector(".text-temp");
const degree = document.querySelector(".degree");
const feelsLike = document.querySelector(".feels-like");
const condition = document.querySelector(".condition");

degree.textContent = "";

searchBtn.addEventListener("click", searchWeather);

inputCity.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});

async function searchWeather() {
  const city = inputCity.value.trim();

  if (!city) {
    return;
  }

  document.body.className = "is-loading";

  condition.textContent = "Loading...";

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=pt&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    condition.textContent = "";
    feelsLike.textContent = "";
    temperature.textContent = "";
    degree.textContent = "";
    cityInfo.textContent = "City not found";
    document.body.className = "";
    return;
  }

  const location = data.results[0];

  const latitude = location.latitude;
  const longitude = location.longitude;

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code`;

  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  const currentTemperature =
    weatherData.current.temperature_2m;

  const currentFeelsLike =
    weatherData.current.apparent_temperature;

  const weatherCode =
    weatherData.current.weather_code;

  let weatherCondition;

  if (weatherCode === 0) {
    weatherCondition = "Clear sky";
  } else if (weatherCode <= 3) {
    weatherCondition = "Cloudy";
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    weatherCondition = "Rain";
  } else if (weatherCode >= 71 && weatherCode <= 77) {
    weatherCondition = "Snow";
  } else if (weatherCode >= 95) {
    weatherCondition = "Thunderstorm";
  } else {
    weatherCondition = "Unknown";
  }

  temperature.textContent = currentTemperature;
  degree.textContent = "°C";
  feelsLike.textContent = `Feels like ${currentFeelsLike}°C`;
  condition.textContent = weatherCondition;
  cityInfo.textContent = location.name;

  document.body.className = "has-weather";
}
