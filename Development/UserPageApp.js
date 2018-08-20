// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    var UserMovies = ["Blade Runner", ]
    var WishList = ["Mission Impossible", ]
    var CheckedOutMovies = ["DeadPool","Avengers" ]

    function displayMovieInfo(){
        var movie = $(this).attr("data-name");
        var xhr = $.get("http://www.omdbapi.com/?i="+ movie +"apikey=b2605f08");

        xhr.done(function(data) {
          console.log("Success got data", data);
        };
    }

    function RenderTopSection(){
        $("#top-section").empty();
        var a = $("<div>")
        a.append("<div class='row'><div class='col-sm-12'><H3><u>Your Wish List</u></H3></div>")
        for(var i=0; i<WishList.length;i++){
            a.addClass("movie-wish-list")
            a.attr("data-name", WishList[i]);
            a.text(WishList[i]);
            $("#top-section").append(a);
        }

    }

    // RenderTopSection()
    // $(document).on("click", ".movie-btn", displayMovieInfo());

});