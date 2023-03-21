const apiKey = 'a32a149444msh771a4acf461ff0ap1c80b2jsn13eb8a36780c';
const host = 'weather-by-api-ninjas.p.rapidapi.com';

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
      const maxTemp = data.max_temp;
      const minTemp = data.min_temp;
      const feelsLike = data.feels_like;
      const humidity = data.humidity;
      const windDegrees = data.wind_degrees;
      const windSpeed = data.wind_speed;

      document.getElementById(`${city.toLowerCase()}-max-temp`).innerHTML = maxTemp;
      document.getElementById(`${city.toLowerCase()}-min-temp`).innerHTML = minTemp;
      document.getElementById(`${city.toLowerCase()}-feels-like`).innerHTML = feelsLike;
      document.getElementById(`${city.toLowerCase()}-humidity`).innerHTML = humidity;
      document.getElementById(`${city.toLowerCase()}-wind-degrees`).innerHTML = windDegrees;
      document.getElementById(`${city.toLowerCase()}-wind-speed`).innerHTML = windSpeed;
    })
    .catch(error => console.error(error));
}
