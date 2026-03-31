const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const form = document.querySelector("#search-form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");
const getWeather = async (city) => {
  weather.innerHTML = `<div class="loading"><h2>Loading...</h2></div>`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return showWeather(data);
};

const showWeather = (data) => {
  if (data.cod == "404") {
    weather.innerHTML = `<div class="error"><h2>City Not Found</h2></div>`;
    return;
  }
  weather.innerHTML = `
        <div class="weather-card">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" class="weather-icon">
            <div class="temperature">${data.main.temp}°C</div>
            <div class="weather-description">${data.weather[0].main}</div>
        </div>
    `;
};

form.addEventListener("submit", function (event) {
  getWeather(search.value);
  event.preventDefault();
});
