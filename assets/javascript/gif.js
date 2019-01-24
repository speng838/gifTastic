
var topics = ["USA", "China", "Russia", "India"];



function createButtons() {

    $("#display").empty();

    for(var i = 0; i<topics.length; i++){

        var alpha = $("<button type='button' class='btn btn-warning'>");
        
        alpha.addClass("gif-btn");
        
        alpha.attr("data-name", topics[i]);
        
        alpha.text(topics[i]);

        $("#display").append(alpha);
    }   
}

        $("#add-gif").on("click",function(){

            event.preventDefault();

            var gif = $("#gif-input").val().trim();

            topics.push(gif);

            createButtons();
        });
    
        $(document).on("click", ".gif-btn", displayGifInfo);

      
        createButtons();
        

    function displayGifInfo(){

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=TRBVdoBuLNw4TobIU57vHU84WTSG7IYM";


        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            
            $("#display2").empty();

            var results = response.data;

            for (var i = 0; i < 10; i++) {
            
            var gifDiv = $("<div class='gif'>");

            var rating = results[i].rating;

            var pOne = $("<p>").text("Rating: " + rating);
            //=======================================
            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height.url.replace(".gif","_s.gif"));

            gifImage.attr("data-still", results[i].images.fixed_height.url.replace(".gif","_s.gif"));

            gifImage.attr("data-animate", results[i].images.fixed_height.url);

            gifImage.attr("data-state", "still");

            gifImage.attr("class", "gif");
            
            gifDiv.append(gifImage);

            gifDiv.append(pOne);

            $("#display2").prepend(gifDiv);
           
            
            }

            $(".gif").on("click", function() {

                var theState = $(this).attr("data-state"); 

                if (theState === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        });
    }