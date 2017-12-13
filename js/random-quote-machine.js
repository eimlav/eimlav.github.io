$(document).ready(function() {
    // Adds transition class to body
    $("body").addClass("bg-colour-transition");

    // When the 'New Quote' button is clicked
    $("#new-quote-button").on("click", function() {
      $(".quote-content").fadeOut("slow");
      $(".quote-author").fadeOut("slow").promise().done(function() {
        var quote, author;
      // Retrieve random quote JSON
      $.getJSON("https://random-quote-generator.herokuapp.com/api/quotes/random", function(val) {
        // Convert JSON into String values
        quote = String(val.quote);
        author = String(val.author);

        // If there was an error with the random quote, use error text
        if(quote == undefined || author == undefined) {
          quote = "Oops something went wrong!";
          author = "";
        }

        // Boolean to determine whether or not to change colour
        var changeColour = Math.floor(Math.random() * 2);

        // Change colour if true
        if(changeColour == 1) {
          // Generates random colour in the form of rgb(x,y,z)
          var rgb = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";

          // Sets new colour to appropriate classes
          $("body").css("background-color", rgb);
          $("#new-quote-button").css("background-color", rgb);
          $("#new-quote-button").css("border-color", rgb);
          $(".colour-transition").css("color", rgb);
        }

        // Sets the new content
        $(".quote-content").html("<h2>“" + quote + "”</h2>");
        $(".quote-author").html("<h4>- " + author + "</h4>");

        $(".quote-content").fadeIn("slow");
        $(".quote-author").fadeIn("slow");

        });
      });


    });
  });
