const inputCity = document.querySelector(".input-city");
const searchBtn = document.querySelector(".search-btn");
const cityInfo = document.querySelector(".city");
const temperature = document.querySelector(".text-temp");

searchBtn.addEventListener("click", async () => {
  const city = inputCity.value;
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt&format=json`;
  const response = await fetch(url);

  const data = await response.json();

  const latitude = data.results[0].latitude;
  const longitude = data.results[0].longitude;

  console.log(latitude, longitude);
});
