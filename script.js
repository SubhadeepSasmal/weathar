const WeatherBtn = document.querySelector("#getWeatherBtn");
const input = document.querySelector("#cityInput");
const div = document.querySelector("#weatherResult");

const apikey = `2c468cb1a4d94ba2835134513241808`;

WeatherBtn.addEventListener("click", async () => {
    const city = input.value;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=yes`;
    input.value = '';
    if (city === '') {
        alert('Please enter a city name');
        return;
    }
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.error) {
           div.innerHTML = `Error: ${data.error.message}`; 
        }
        else {
            const temperature =data.current.temp_c;
            const description = data.current.condition.text; 
            div.innerHTML = `<p><strong>${city},${data.location.country}</strong></p>
                            <p>Temperature: ${temperature}°C </p>
                            <p>Condition: ${description}</p>`;
        }
    }
    catch (error) {
        div.innerHTML = `Error: ${error.message}`;
    }
});
