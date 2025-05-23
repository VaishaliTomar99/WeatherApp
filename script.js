const apiKey = "62402ac1cf8343201ccecfd1341e2e1d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-city input");
const searchBtn = document.querySelector(".search-city button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update text content
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        // Set weather icon based on condition
        const condition = data.weather[0].main;
        let iconSrc = "";

        switch (condition) {
            case "Clouds":
                iconSrc = "images/clouds.png";
                break;
            case "Clear":
                iconSrc = "images/clear.png";
                break;
            case "Rain":
                iconSrc = "images/rain.png";
                break;
            case "Drizzle":
                iconSrc = "images/drizzle.png";
                break;
            case "Mist":
                iconSrc = "images/mist.png";
                break;
            case "Snow":
                iconSrc = "images/snow.png";
                break;
            default:
                iconSrc = "images/cloudy.jpg"; // fallback icon
        }

        weatherIcon.src = iconSrc;

    } catch (error) {
        alert(error.message);
    }
}

// Trigger weather search on button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
