var searchButton = document.getElementById('search-btn');
var APIKey = "e55ee97b6b016b9b14fab1caec587add";
var city = "Atlanta";

function getApi() {
   var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-37.910760&lon=144.622444&appid=e55ee97b6b016b9b14fab1caec587add';
// var requestUrl = "https://api.github.com/orgs/nodejs/repos";
alert(requestUrl);
fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
    
}

searchButton.addEventListener('click', getApi);