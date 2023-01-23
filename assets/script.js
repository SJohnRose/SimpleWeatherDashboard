var searchButton = document.getElementById('search-btn');
var cityInputEl = document.getElementById("cityname");

function getApi() {
    var searchCity = cityInputEl.value;
    console.log(searchCity); 
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=e55ee97b6b016b9b14fab1caec587add&q='+ searchCity;
    fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => populateData(data));
    
}

searchButton.addEventListener('click', getApi);

function setValueToElement(id, value) {
    document.getElementById(id).textContent = value;
}

function populateData(data) {
    console.log(data);
    console.log(data.list[0].weather[0].icon);
    var cityDate= data.city.name + "   (" + data.list[0].dt_txt + ")";
    setValueToElement('city-name', cityDate);
    document.getElementById('weather-icon').src="http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png";
    setValueToElement('city-temp-1', "Temp:" + data.list[0].main.temp + " 0 C");
    setValueToElement('city-wind-1', "Wind:" + data.list[0].wind.speed + " MPH");
    setValueToElement('city-humidity-1', "Humidity:" + data.list[0].main.humidity + " %");
}