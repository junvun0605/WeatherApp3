const apiKey = "1806759fac1e9f80ffb396986b33870b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchCity = document.querySelector(".search-city input");
const searchButton = document.querySelector(".search-city button");
const weatherIcon = document.querySelector(".weather-icon");
const timeNow = document.querySelector("time-now");
const now = new Date();



async function currentWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    try{
        var data = await(response.json());

        document.querySelector(".cities").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " KM/h";
        document.querySelector(".humid").innerHTML = data.main.humidity + " %";
        document.querySelector(".press").innerHTML = data.main.pressure +" Pa";
        document.querySelector(".current").innerHTML = data.weather[0].description;

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/weather/cloudy.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/weather/sun.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/weather/rain.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "images/weather/snow.png";
        }
        else if(data.weather[0].main == "Thunderstorm"){
            weatherIcon.src = "images/weather/storm.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/weather/mist.png";
        }


    }catch(error){     
        alert("Invalid city name");
    }
    
}

async function currentForecast(city){
    
    try{
        const response = await fetch(apiUrlForecast + city + `&appid=${apiKey}`);
        if(!response.ok){
            throw new Error('Failed to fetch forecast data');
        }
        var data = await response.json();
        console.log(data);

        var dateString = data.list[0].dt_txt;

        var forecastDate = new Date(dateString);

        forecastDate.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var formattedDate = forecastDate.toLocaleDateString(undefined, options);

        document.querySelector(".date-now").innerHTML = formattedDate;

        for (var i = 0; i < 5; i++) {
            var forecastTime = new Date(data.list[i].dt_txt);
            forecastTime.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
            
            var hours = forecastTime.getHours();
            var minutes = forecastTime.getMinutes();

            var formattedHours = hours % 12 || 12;
            var period = hours < 12 ? 'AM' : 'PM';
            var formattedTime = (formattedHours < 10 ? '0' : '') + formattedHours + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + period;

            document.querySelector(`.grid-item-${i+1}`).innerHTML = formattedTime;
        }

        for (var i = 0; i < 5; i++) {
            var forecastIcon = document.querySelector(`.forecast-icon-${i+1}`);

            var forecastIcons = data.list[i].weather[0].main;

            switch (forecastIcons) {
                case "Clouds":
                    forecastIcon.src = "/images/weather/cloudy.png";
                    break;
                case "Clear":
                    forecastIcon.src = "/images/weather/sun.png";
                    break;
                case "Rain":
                    forecastIcon.src = "/images/weather/rain.png";
                    break;
                case "Snow":
                    forecastIcon.src = "/images/weather/snow.png";
                    break;
                case "Thunderstorm":
                    forecastIcon.src = "/images/weather/storm.png";
                    break;
                case "Mist":
                    forecastIcon.src = "/images/weather/mist.png";
                    break;
                default:
                    forecastIcon.src = "/images/weather/unknown.png";
            }
        }

        for(var i = 0; i < 5; i++){
            var minTemperature = data.list[i].main.temp_min;
            var maxTemperature = data.list[i].main.temp_max;
            document.querySelector(`.min-temp-${i+1}`).innerHTML = "Min: " + Math.round(minTemperature) + "°C";
            document.querySelector(`.max-temp-${i+1}`).innerHTML = "Max: " + Math.round(maxTemperature) + "°C";
            
        }

    }catch(error){
        console.error('Error fetching forecast data:', error.message);
    }
    
}



searchButton.addEventListener("click", ()=>{
    currentWeather(searchCity.value);
    currentForecast(searchCity.value);
});

