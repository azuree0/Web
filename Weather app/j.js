const apiKey = "a05aaca96e326e6db234d4e077a5bc3c";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const oneCallApiUrl = "https://api.openweathermap.org/data/3.0/onecall?";
const airPollutionApiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const clearBtn = document.querySelector(".search .clear-btn");
const unitToggle = document.querySelector(".unit-toggle");
const weatherIcon = document.querySelector(".weather-icon");
let isMetric = true;

function showLoading() {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".loading").style.display = "block";
}

function hideLoading() {
    document.querySelector(".loading").style.display = "none";
}

function getLocalTime(timezoneOffset) {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezoneOffset * 1000));
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function convertTemp(temp, toMetric) {
    if (toMetric) return temp;
    return (temp * 9/5) + 32; 
}

function convertSpeed(speed, toMetric) {
    if (toMetric) return speed; 
    return speed * 0.621371;
}

function calculateDewPoint(temp, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 10) / 10;
}

function estimateSolarIrradiance(cloudCover, lat) {
    const maxIrradiance = 1000;
    return Math.round(maxIrradiance * (1 - cloudCover / 100));
}

async function updateWeatherDisplay(data, useMetric) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;

    let aqi = "N/A";
    try {
        const airPollutionResponse = await fetch(`${airPollutionApiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const airPollutionData = await airPollutionResponse.json();
        aqi = airPollutionData.list[0].main.aqi || "N/A";
    } catch (error) {
        console.error("Error fetching additional data:", error);
    }

    document.querySelector(".city").innerHTML = data.name;
    const temp = Math.round(convertTemp(data.main.temp, useMetric));
    document.querySelector(".temp").innerHTML = `${temp}${useMetric ? "°C" : "°F"}`;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = `${convertSpeed(data.wind.speed, useMetric).toFixed(1)} ${useMetric ? "km/h" : "mph"}`;
    document.querySelector(".precipitation").innerHTML = data.rain ? `${data.rain["1h"] || 0} mm` : "0 mm";
    document.querySelector(".dew-point").innerHTML = `${convertTemp(calculateDewPoint(data.main.temp, data.main.humidity), useMetric).toFixed(1)}${useMetric ? "°C" : "°F"}`;
    document.querySelector(".cloud-cover").innerHTML = `${data.clouds.all}%`;
    document.querySelector(".aqi").innerHTML = aqi;
    document.querySelector(".solar-irradiance").innerHTML = `${estimateSolarIrradiance(data.clouds.all, lat)} W/m²`;
    document.querySelector(".ambient-temp").innerHTML = `${temp}${useMetric ? "°C" : "°F"}`;
    document.querySelector(".pressure").innerHTML = `${data.main.pressure} hPa`;
    document.querySelector(".local-time").innerHTML = getLocalTime(data.timezone);

    const weatherCondition = data.weather[0].main;
    const iconMap = {
        "Clouds": "images/clouds.png",
        "Clear": "images/clear.png",
        "Rain": "images/rain.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png"
    };
    weatherIcon.src = iconMap[weatherCondition] || "images/clear.png";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

async function checkWeather(city) {
    if (!city.trim()) {
        document.querySelector(".error").innerHTML = "Please enter a city name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        hideLoading();
        return;
    }

    showLoading();
    try {
        const response = await fetch(weatherApiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
            document.querySelector(".error").innerHTML = "Invalid city name";
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (!response.ok) {
            throw new Error("Network error occurred");
        } else {
            const data = await response.json();
            await updateWeatherDisplay(data, isMetric);
        }
    } catch (error) {
        document.querySelector(".error").innerHTML = "Failed to fetch weather data";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } finally {
        hideLoading();
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        searchBox.value = "";
        searchBox.focus();
    });
}

if (unitToggle) {
    unitToggle.addEventListener("click", () => {
        isMetric = !isMetric;
        unitToggle.innerHTML = isMetric ? "Switch to °F" : "Switch to °C";
        if (searchBox.value) {
            checkWeather(searchBox.value); 
        }
    });
}