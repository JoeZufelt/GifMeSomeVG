// API key 1kW6fbxjvOPE2Ef6e2f26fpQP1xYhf2q
$(document).ready(function () {

    var gamesArray = ["Fallout", "Final Fantasy", "Mario Bros", "Kingdom Hearts"];

    function displayGame() {

        var game = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=1kW6fbxjvOPE2Ef6e2f26fpQP1xYhf2q&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var gameGif = $("<img>");
                    var gameStill = results[i].images.original_still.url;
                    var gameMove = results[i].images.original.url;
                    gameGif.attr("src", gameStill);
                    gifDiv.append(p);
                    gifDiv.append(gameGif);
                    $(".gifs").prepend(gifDiv);
                    console.log(results);
                }; // End if
            }; // End for
        }); // End then
    }; // End displayGame

    function renderButtons() {
        $("#buttons").empty();
        for (var i = 0; i < gamesArray.length; i++) {
            var a = $("<button>");
            a.addClass("game-btn");
            a.attr("data-name", gamesArray[i]);
            a.text(gamesArray[i]);
            $("#buttons").append(a);
        }; // End for
    }; // End renderButtons

    $("#add-game").on("click", function (event) {
        event.preventDefault();
        var game = $("#game-input").val().trim();
        gamesArray.push(game);
        renderButtons();
    }); // End Add Game Click

    // Start and Stop Gifs
    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    $(document).on("click", ".game-btn", displayGame);
    renderButtons();

}); // End Main Fuction