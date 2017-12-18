$(document).ready(function() {
  $("#search").on("keyup", function (e) {
      //console.log($("#search").val());
      sendSearchRequest();
  });

  function sendSearchRequest()
  {
    var query = $("#search").val().replace(/ /g, "&20");
    console.log(query);
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + query + "&utf8=&format=json&callback=\?", function(val) {
      console.log(val);
      $(".main").html("");
      for (var i = 0; i < 10; i++) {
        console.log("Search Result " + i + val.query.search[i].title);
        var link = "https://en.wikipedia.org/wiki/" + val.query.search[i].title.replace(/ /g, "_");
        $(".main").append("<hr><a target=\"_blank\" href=\"" + link + "\"><div class=\"result\"><h3 class=\"result-title\">" + val.query.search[i].title + "</h3><p class=\"result-text\">" + val.query.search[i].snippet + "...</p></div></a>");
      }
      $(".main").append("<h6 class=\"footer text-center\">by el</h6>");
    });
  }
});
