const apiKey = 'a32a149444msh771a4acf461ff0ap1c80b2jsn13eb8a36780c';
const host = 'weather-by-api-ninjas.p.rapidapi.com';

// fetches weather data from the API for the Common Places - table.
function fetchData(city) {
  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, {
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": host
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // if the API is offline, "Service offline" will be displayed instead of the data.
      const maxTemp = data.max_temp !== undefined ? data.max_temp : "Service offline";
      const minTemp = data.min_temp !== undefined ? data.min_temp : "Service offline";
      const feelsLike = data.feels_like !== undefined ? data.feels_like : "Service offline";
      const humidity = data.humidity !== undefined ? data.humidity : "Service offline";
      const windDegrees = data.wind_degrees !== undefined ? data.wind_degrees : "Service offline";
      const windSpeed = data.wind_speed !== undefined ? data.wind_speed : "Service offline";

      document.getElementById(`${city.toLowerCase()}-max-temp`).innerHTML = maxTemp;
      document.getElementById(`${city.toLowerCase()}-min-temp`).innerHTML = minTemp;
      document.getElementById(`${city.toLowerCase()}-feels-like`).innerHTML = feelsLike;
      document.getElementById(`${city.toLowerCase()}-humidity`).innerHTML = humidity;
      document.getElementById(`${city.toLowerCase()}-wind-degrees`).innerHTML = windDegrees;
      document.getElementById(`${city.toLowerCase()}-wind-speed`).innerHTML = windSpeed;
    })
    .catch(error => console.error(error));
}

