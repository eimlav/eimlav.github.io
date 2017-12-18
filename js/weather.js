$(document).ready(function() {
  getLocation();

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true);
      xmlHttp.send(null);
  }

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          $("#location").html("Geolocation is not supported by this browser.");
      }
  }

  function showPosition(position) {
      var jsonInfo = [];
      httpGetAsync("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords
      .longitude, function(val) {
        jsonInfo = JSON.parse(val);
        console.log(jsonInfo);
        console.log(jsonInfo.weather[0].icon);
        $("#weather-img").attr("src", jsonInfo.weather[0].icon);
        $("#location").html(jsonInfo.name + ", " + jsonInfo.sys.country);
        $("#description").html(jsonInfo.weather[0].main);
        $("#temperature").html((Math.round(jsonInfo.main.temp * 10) / 10) + "&#8451; | " + (Math.round((jsonInfo.main.temp*1.8+32) * 10 ) / 10)+ "&#8457;");
        $("#wind").html(jsonInfo.wind.speed + " km/h | " + jsonInfo.wind.deg + "&#176;");
      })
  }

  function showError(error) {
    $("#description").html("");
      switch(error.code) {
          case error.PERMISSION_DENIED:
              $("#location").html("User denied the request for Geolocation.");
              break;
          case error.POSITION_UNAVAILABLE:
              $("#location").html("Location information is unavailable.");
              break;
          case error.TIMEOUT:
              $("#location").html("The request to get user location timed out.");
              break;
          case error.UNKNOWN_ERROR:
              $("#location").html("An unknown error occurred.");
              break;
      }
  }
});
