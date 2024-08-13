const WeatherBtn = document.querySelector("#getWeatherBtn");
const input = document.querySelector("#cityInput");
const div = document.querySelector("#weatherResult");

const apikey = `44c0411164dc00b3e1077f4b615b8c3a`;

WeatherBtn.addEventListener("click", async () => {
    const city = input.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    input.value = '';
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === '404') {
           div.innerHTML = `Error: ${data.error}`; 
        }
        else if (data.cod !== 200) {
            div.innerHTML = `Error: ${data.message}`;
        }
        else {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            div.innerHTML = `<p><strong>${city}</strong></p>
                            <p>Temperature: ${temperature}°C </p>
                            <p>Condition: ${description}</p>`;
        }
    }
    catch (error) {
        div.innerHTML = `Error: ${error.message}`;
    }
});
