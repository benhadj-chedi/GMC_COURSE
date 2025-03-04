const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "022125c96bf78b6e7dbc66f08b6affb5";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

async function getchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    cityInput.textContent = data.name;
    temperature.textContent = `Temperature ${data.main.temp}°C`;
    description.textContent = `Weather ${data.weather[0].description}`;
    weatherInfo.classList.remove("hidden");
  } catch (e) {
    alert(e.message);
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getchWeather(city);
  } else {
    alert("please enter a city name");
  }
});
