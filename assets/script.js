var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("cityname");
var historySectionEl = document.getElementById("search-history-section");
var clicked = false;


// Function to get weather data from Open Weather Map API
function getApi() {
    var cityName = cityInputEl.value;
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=e55ee97b6b016b9b14fab1caec587add&q='+ cityName + "&units=metric";
    clicked = true;
    showHistoryLocal();
    fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => populateData(data));
    storeHistoryLocal(cityName);
}

// Event listener for the Search button
searchButton.addEventListener('click', getApi);

// Setting the values into HTML elements
function setValueToElement(id, value) {
    document.getElementById(id).textContent = value;
}

// Extracting the required temperature, wind and humidity information from weather JSON
function populateData(data) {
    var cityDate= data.city.name + "   (" + data.list[0].dt_txt + ")";
    setValueToElement('city-name', cityDate);
    document.getElementById('weather-icon').src="http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
    setValueToElement('city-temp-1', "Temp:  " + data.list[0].main.temp + '  \u00B0' + "C");
    setValueToElement('city-wind-1', "Wind:  " + data.list[0].wind.speed + " MPH");
    setValueToElement('city-humidity-1', "Humidity:  " + data.list[0].main.humidity + " %");
    showFiveDayWeather(data);
    
}

// Store the cities searched in local storage
function storeHistoryLocal(cityName) {
    var citiesLocal = localStorage.getItem("City-History");
    citiesLocal = citiesLocal ? JSON.parse(citiesLocal) : [];
    if(!citiesLocal.includes(cityName)) {
        citiesLocal.push(cityName);
        localStorage.setItem("City-History", JSON.stringify(citiesLocal));
    }
}

// Retrieve search history from local storage and display in web page
function showHistoryLocal() {
    if(clicked==true) {
    var citiesLocal = localStorage.getItem("City-History");
    citiesLocal = citiesLocal ? JSON.parse(citiesLocal) : [];
    var numCities = citiesLocal.length;
    for(var i=0; i<numCities; i++) {
        let cityEl = document.createElement("button");
        cityEl.setAttribute("class", "city-button");
        cityEl.setAttribute("type", "button");
        cityEl.style.backgroundColor = "lightgrey";
        cityEl.style.fontSize = "15px";
        cityEl.style.padding = "5px";
        cityEl.style.borderRadius = "12px";
        cityEl.style.marginBottom = "20px";
        cityEl.style.width = "450px";
        cityEl.style.height = "40px";
        cityEl.textContent = citiesLocal[i];
        historySectionEl.appendChild(cityEl);
    }  
}    
}


historySectionEl.addEventListener('click', function (event) {
    if(event.target.textContent != "Search") {
        console.log(event.target.textContent);
        cityInputEl.textContent = event.target.textContent;
        //getApi;
    }
});

function showFiveDayWeather(data) {
    for (var i=1; i<=5;i++) {
        var cityDate= data.list[7*i].dt_txt;
        setValueToElement('date'+i, cityDate);
        document.getElementById('weather-icon-day'+i).src="http://openweathermap.org/img/wn/" + data.list[7*i].weather[0].icon + ".png";
        setValueToElement('temp-day'+i, "Temp:  " + data.list[7*i].main.temp + '  \u00B0' + "C");
        setValueToElement('wind-day'+i, "Wind:  " + data.list[7*i].wind.speed + " MPH");
        setValueToElement('humidity-day'+i, "Humidity:  " + data.list[7*i].main.humidity + " %");
    }
}