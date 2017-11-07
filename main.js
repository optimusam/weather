let weather_area = document.querySelector("#weather-area");
let loc = document.querySelector("#loc");
let deg = document.querySelector(".deg");
let weather = document.querySelector("#weather");
let icon = document.querySelector("#icon");
let humid = document.querySelector("#humid");
let wind = document.querySelector("#wind");
let lat, long, data, degC, degF, ms, kmh;
findMe();
deg.addEventListener("click", changeTemp);
wind.addEventListener("click", changeWind);
function findMe() {
    if (!navigator.geolocation) {
        weather_area.textContent = "No position found";
        return;
    }
    function success(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getWeather(lat, long);
    }
    function error() {
        weather_area.innerHTML = "Unable to retrieve your location";
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

function getWeather(lat, long) {
    let request = new XMLHttpRequest();
    request.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`, true);
    request.onload = function () {
        if (request.status == 200) {
            data = JSON.parse(request.responseText);
            degC = data.main.temp;
            degF = (9 / 5) * degC + 32;
            ms = data.wind.speed;
            kmh = (data.wind.speed * 3.6).toFixed(1);
            displayWeather(data);
        }

    }
    request.onerror = function () {
        weather_area.textContent = request.responseText;
    }
    request.send();
}

function displayWeather(data) {
    // weather_area.classList.remove("hide");
    loc.textContent = data.name + ', ' + data.sys.country;
    temp.innerHTML = data.main.temp + "<span class='units' id='deg'>&deg;C</span>";
    humid.innerHTML ="Humidity: " + data.main.humidity + "%";
    wind.innerHTML = "Wind: " + data.wind.speed + "<span class='units'> m/s</span>";
    weather.textContent = data.weather[0].main;
    icon.src = data.weather[0].icon;
}

function changeTemp() {
    if(data.main.temp == degC) {
        data.main.temp = degF;
        temp.innerHTML = data.main.temp + "<span class='units' id='deg'>&deg;F</span>";
    }
    else if(data.main.temp == degF) {
        data.main.temp = degC;
        temp.innerHTML = data.main.temp + "<span class='units' id='deg'>&deg;C</span>";
    }
}

function changeWind() {
    if (data.wind.speed == ms) {
        data.wind.speed = kmh;
        wind.innerHTML = "Wind: " + kmh + "<span class='units'> km/h</span>";
    }
    else if (data.wind.speed == kmh) {
        data.wind.speed = ms;
        wind.innerHTML = "Wind: " + ms + "<span class='units'> m/s</span>";
    }
}
