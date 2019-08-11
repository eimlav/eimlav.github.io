$(document).ready(function() {

  // When key is released in search bar, search request is sent
  $("#search").on("keyup", function (e) {
      sendSearchRequest();
  });

  // Sends request using Wikipedia API based on the value of the search box
  // and attaches results to main container
  function sendSearchRequest()
  {
    var query = $("#search").val().replace(/ /g, "&20");
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&utf8=&format=json&callback=\?", function(val) {
      $(".main").html("");
      for (var i = 0; i < 10; i++) {
        var link = "https://en.wikipedia.org/wiki/" + val.query.search[i].title.replace(/ /g, "_");
        $(".main").append("<hr><a target=\"_blank\" href=\"" + link + "\"><div class=\"result\"><h3 class=\"result-title\">" + val.query.search[i].title + "</h3><p class=\"result-text\">" + val.query.search[i].snippet + "...</p></div></a>");
      }
      $(".main").append("<h6 class=\"footer text-center\">by el</h6>");
    });
  }
});
