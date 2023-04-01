localStorage.setItem("city", city);

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
    cityName.innerHTML = city;

    fetch(
      "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        temp.innerHTML = response.temp || "N/A";
        feels_like.innerHTML = response.feels_like || "N/A";
        humidity.innerHTML = response.humidity || "N/A";
        humidity1.innerHTML = response.humidity || "N/A";
        min_temp.innerHTML = response.min_temp || "N/A";
        max_temp.innerHTML = response.max_temp || "N/A";
        wind_speed.innerHTML = response.wind_speed || "N/A";
        wind_speed1.innerHTML = response.wind_speed || "N/A";
        wind_degrees.innerHTML = response.wind_degrees || "N/A";
      })
      .catch((err) => console.error(err));
  };
  document.getElementById("newCity").addEventListener("click", (e) => {
    clearFeedbackDisplay();
    e.preventDefault();
    window.location.replace("main.html?city=" + city.value);
    getWeather(city.value);
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
  var btn = document.getElementById("newCity");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.replace("main.html?city=" + city.value);
    updateFavoritesIcon();
  });
}

// This function is called when the user clicks on search button
function clearFeedbackDisplay() {
  // clear the contents of the feedback display container
  const feedbackDisplay = document.querySelector("#live-comments-container");
  feedbackDisplay.innerHTML = "";
}
