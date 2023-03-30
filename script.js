const key = 'd0e531028fc8f0dc428b9a2ef2bcbf24';
var search = document.querySelector("#search");
var recentSearch = document.querySelector(".recent-search");
var searchResult = document.querySelector(".search-result");
var city = document.getElementById("city");
var searchHistory = [];
var forcast = document.querySelector(".forcast");



function cityWeather(event) {

    console.log(city);
    console.log(city.value);
    event.preventDefault();
    showRecentSearch();
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=imperial&appid=d0e531028fc8f0dc428b9a2ef2bcbf24`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var date = new Date(data.list[0].dt * 1000).toLocaleDateString();
            var cityName = data.city.name;
            var temp = data.list[0].main.temp;
            var humidity = data.list[0].main.humidity;
            var windSpeed = data.list[0].wind.speed;
            var icon = data.list[0].weather[0].icon;
            var dateText = data.list[0].dt_txt;
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;

            fiveDay(lat, lon);
            displayWeatherData(cityName, date, temp, humidity, windSpeed, icon);


        })

        .catch(function error(error) {
            console.error(error);
        });

}


search.addEventListener("click", cityWeather)

function displayWeatherData(cityName, date, temp, humidity, windSpeed, icon) {
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
    var button = document.createElement('button');
    button.appendChild(cities);
    button.addEventListener('click', function retrievePreviousWeatherData() {
   
    });
    history.appendChild(button);
    searchHistory.push(city.value);
    localStorage.setItem('city', searchHistory);

}



function fiveDay(lat, lon) {
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d0e531028fc8f0dc428b9a2ef2bcbf24`)
        .then(function (response) {
            return response.json();
            console.log(response);
        })
        .then(function (data) {
              console.log(data.list.length);
              for(let i = 0; i < data.list.length; i+=8) {
               var time= data.list[i].dt_txt;
              console.log(time);


              var fiveDayDate = new Date(data.list[i].dt * 1000).toLocaleDateString();
              var citiesName = data.city.name;
              var fiveDayTemp = data.list[i].main.temp;
              var fiveDayHumidity = data.list[i].main.humidity;
              var fiveDayWindSpeed = data.list[i].wind.speed;
              var fiveDayIcon = data.list[i].weather[i].icon;
              var fiveDayDateText = data.list[i].dt_txt;
              var lat = data.city.coord.lat;
              var lon = data.city.coord.lon;

              displayFiveDayWeather(citiesName, fiveDayDate, fiveDayTemp, fiveDayHumidity, fiveDayWindSpeed, fiveDayIcon);
              }
             
        })

        .catch(function error(error) {
            console.error(error);
        });
}


function displayFiveDayWeather(citiesName, fiveDayDateText, fiveDayTemp, fiveDayHumidity, fiveDayWindSpeed, fiveDayIcon) {
    var forcastResult = document.querySelector('.forecast-result');
    var fiveDayIconUrl = `https://openweathermap.org/img/w/${fiveDayIcon}.png`
    forcastResult.innerHTML = `
         <h2>(${fiveDayDateText})</h2> <img id="icon" src="${fiveDayIconUrl}" alt="Weather icon">
         <p>Temperature: ${fiveDayTemp} &deg;F</p>
         <p>Humidity: ${fiveDayHumidity}%</p>
         <p>Wind Speed: ${fiveDayWindSpeed} MPH</p>
        `
       ;
    forcast.appendChild(forcastResult);

}

