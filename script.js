function updateWeather(response) {
  let clearInput = document.querySelector("#input");
  clearInput.value = "";

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);

  let searchCity = document.querySelector("#current-city");
  searchCity.innerHTML = response.data.city;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#windSpeed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;

  let date = new Date(response.data.time * 1000);
  timestamp = document.querySelector("#timestamp");
  timestamp.innerHTML = `${date.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png" />`;
}

function getWeather(city) {
  //make api call and update details inteface
  let apiKey = "67d0faba43ba3e4a6a1f2t07194ao013";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);

  // make api call and update forecast
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);
}

function forecastDaily(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let dailyForecast = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      dailyForecast += `
          
        <div class="row">
          <div class="column">
            <h3>${forecastDaily(day.time)}</h3>
            <img src="${day.condition.icon_url}" alt="weather-icon" />
            <div class="temp">
              <span class="max">${Math.round(day.temperature.maximum)}°</span>
              <span class="min">${Math.round(day.temperature.minimum)}°</span>
            </div>
          </div>
        </div>
        `;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = dailyForecast;
}

let search = document.getElementById("search-city");

search.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;

  getWeather(city);
});

//default city upon reload
getWeather("Bogota");
