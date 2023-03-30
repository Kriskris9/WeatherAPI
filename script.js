const key = 'd0e531028fc8f0dc428b9a2ef2bcbf24';
var search = document.querySelector("#search");
var recentSearch = document.querySelector(".recent-search");
var searchResult = document.querySelector(".search-result");
var city = document.getElementById("city");
var searchHistory = [];


function cityWeather(event) {

    console.log(city);
    console.log(city.value);
    event.preventDefault();
    showRecentSearch();
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=imperial&appid=d0e531028fc8f0dc428b9a2ef2bcbf24&cnt=5`) 
        .then(function (response) {
            return response.json();
            console.log(response);
        })
        .then(function (data) {
            var date = new Date(data.list[0].dt * 1000).toLocaleDateString();
            var cityName = data.city.name;
            var temp = data.list[0].main.temp;
             var humidity = data.list[0].main.humidity;
            var windSpeed = data.list[0].wind.speed;
            var icon = data.list[0].weather[0].icon;
            var dateText = data.list[0].dt_txt;

            displayWeatherData(cityName, date, temp, humidity, windSpeed, icon);


        })

        .catch(function error(error) {
            console.error(error);
        });
}
 

search.addEventListener("click", cityWeather)

function displayWeatherData (cityName, date, temp, humidity, windSpeed, icon) {
    var currentWeatherEl = document.querySelector('.recent-search');
    var iconUrl = `https://openweathermap.org/img/w/${icon}.png`
    currentWeatherEl.innerHTML = `
         <h2>${cityName} (${date})</h2> <img id="icon" src="${iconUrl}" alt="Weather icon">
         <p>Temperature: ${temp} &deg;F</p>
         <p>Humidity: ${humidity}%</p>
         <p>Wind Speed: ${windSpeed} MPH</p>
       `;
    searchResult.appendChild(currentWeatherEl);
    
}
 


    function showRecentSearch() {
        var history = document.querySelector('.history');
        var cities = document.createElement('li');
        cities.textContent = city.value;
        history.appendChild(cities);
        searchHistory.push(city.value);
        localStorage.setItem('city', searchHistory);
    }


