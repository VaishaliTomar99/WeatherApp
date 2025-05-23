const apiKey = "62402ac1cf8343201ccecfd1341e2e1d"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-city input");
const searchBtn = document.querySelector(".search-city button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        alert("City not found!");
        return;
    }

    const data = await response.json();

    // Update UI with weather data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Update weather icon based on condition
    const condition = data.weather[0].main;

    switch (condition) {
        case "Clouds":
            weatherIcon.src = "D:\WeatherApp\clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "D:\WeatherApp\clear.png";
            break;
        case "Rain":
            weatherIcon.src = "D:\WeatherApp\rain.avif";
            break;
        case "Drizzle":
            weatherIcon.src = "D:\WeatherApp\drizzle.webp";
            break;
        case "Mist":
            weatherIcon.src = "D:\WeatherApp\mist.png";
            break;
        case "Snow":
            weatherIcon.src = "D:\WeatherApp\snow.png";
            break;
        default:
            weatherIcon.src = "images/cloudy.jpg"; // fallback icon
            break;
    }
}

// When user clicks search
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
