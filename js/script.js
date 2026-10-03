const inputCity = document.querySelector(".input-city");
const searchBtn = document.querySelector(".search-btn");
const cityInfo = document.querySelector(".city");
const temperature = document.querySelector(".text-temp");
const degree = document.querySelector(".degree");

degree.textContent = "";

searchBtn.addEventListener("click", async () => {
  const city = inputCity.value;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=pt&format=json`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    temperature.textContent = "";
    degree.textContent = "";
    cityInfo.textContent = "City not found";
    return;
  }

  const latitude = data.results[0].latitude;
  const longitude = data.results[0].longitude;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;

  const weatherResponse = await fetch(weatherUrl);

  const weatherData = await weatherResponse.json();
  const currentTemperature = weatherData.current.temperature_2m;
  temperature.textContent = currentTemperature;
  degree.textContent = "°C";
  cityInfo.textContent = data.results[0].name;
});
