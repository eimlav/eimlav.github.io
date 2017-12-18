$(document).ready(function() {
  $("#search").on("keyup", function (e) {
      console.log($("#search").val());

      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Albert%20Einstein&utf8=&format=json", function(val) {
        console.log(val);
      });
  });

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true);
      xmlHttp.setRequestHeader("Access-Control-Allow-Origin", theUrl);
      xmlHttp.send();
  }
});
