let search = document.getElementById("search-city");
search.addEventListener("submit", function (event) {
   event.preventDefault();
   let city = document.querySelector("#input").value;
   let searchCity = document.querySelector("#current-city");
   searchCity.innerHTML = city;
});