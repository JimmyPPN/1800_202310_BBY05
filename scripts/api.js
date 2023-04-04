// Set the default city to Vancouver
let city = "Vancouver";

let fileName = location.href.split("/").slice(-1)[0];
if (fileName.startsWith("main.html")) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a32a149444msh771a4acf461ff0ap1c80b2jsn13eb8a36780c",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  const getWeather = (city) => {
    const cityName = document.getElementById("cityName");
    console.log(cityName);
    cityName.innerHTML = city;

    fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        temp.innerHTML = response.temp !== undefined ? response.temp : "(Service offline)";
        feels_like.innerHTML = response.feels_like !== undefined ? response.feels_like : "(Service offline)";
        humidity.innerHTML = response.humidity !== undefined ? response.humidity : "(Service offline)";
        humidity1.innerHTML = response.humidity !== undefined ? response.humidity : "(Service offline)";
        min_temp.innerHTML = response.min_temp !== undefined ? response.min_temp : "(Service offline)";
        max_temp.innerHTML = response.max_temp !== undefined ? response.max_temp : "Service offline";
        wind_speed.innerHTML = response.wind_speed !== undefined ? response.wind_speed : "(Service offline)";
        wind_speed1.innerHTML = response.wind_speed !== undefined ? response.wind_speed : "(Service offline)";
        wind_degrees.innerHTML = response.wind_degrees !== undefined ? response.wind_degrees : "(Service offline)";
      })
      .catch((err) => console.error(err));
  };

  console.log(newCityButton);
  $(newCityButton).on("click touchstart", (e) => {
    clearFeedbackDisplay();
    e.preventDefault();
    const city = document.getElementById("city").value;
    window.location.replace("main.html?city=" + city);
    getWeather(city);
    updateFavoritesIcon();
  });

  var params = new URLSearchParams(window.location.search);
  var c = params.get("city");
  if (c != null) {
    getWeather(c);
  } else {
    getWeather("Vancouver");
  }
} else {
  $(newCityButton).on("click touchstart", (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value;
    window.location.replace("main.html?city=" + city);
    updateFavoritesIcon();
  });
}

// This function is called when the user clicks on search button
function clearFeedbackDisplay() {
  // clear the contents of the feedback display container
  const feedbackDisplay = document.querySelector("#live-comments-container");
  feedbackDisplay.innerHTML = "";
}
