$("#searchMovieBtn").on("click", function () {
  console.log("clicked")
  event.preventDefault();
  var movieToSearch = $("#searchMovie")
    .val()
    .trim();

  var queryURL =
    "https://www.omdbapi.com/?s=" +
    movieToSearch +
    "&y=&plot=short&apikey=trilogy";

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    // Creates a div to hold the movie
    console.log(response)
    response.Search.forEach(element => {

      console.log(element)
      var newDiv = $("<div>");

      newDiv.addClass("addMovie")



      // Retrieves the Rating Data
      var titleInfo = element.Title

      var omdbKey = element.imdbID

      var titleH2 = $("<h2>")

      newDiv.attr("title", titleInfo)

      newDiv.attr("omdbKey", omdbKey)

      titleH2.html(titleInfo)

      newDiv.append(titleH2);

      var releaseYear = element.Year;
      // Creates an element to hold the release year
      var releaseYearP = $("<p>");
      // Displays the release year
      releaseYearP.html("Release year: " + releaseYear);

      newDiv.append(releaseYearP);

      var image = element.Poster;
      // Creates an element to hold the image
      var imgElement = $("<img>");
      imgElement.attr("src", image);
      // Appends the image
      newDiv.append(imgElement);
      // Puts the entire Movie above the previous movies.

      $("#movies-view").prepend(newDiv);

    })


  });
});

$('body').on('click', '.addMovie', function () {

  event.preventDefault();

  var queryURL =
    "https://www.omdbapi.com/?i=" +
    $(this).attr("omdbKey") +
    "&apikey=trilogy";
console.log(queryURL)
  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {




    //title, loanStatus, loanerID, plot, poster, actors, omdbKey, director

    
    console.log(response)
    var movieDiv = $("<div>")

    //movie title
    var p = $("<p>")

    p.html(response.Title)

    movieDiv.append(p)

    p = $("<p>")

    //movie plot
    p.html(response.Plot)

    movieDiv.append(p)

    var newImg = $("<img>")

    newImg.attr("src", response.Poster)

    movieDiv.append(newImg)


    //the "claim it" button has all the data for the movies table"
    //
    //x title, loanStatus, loanerID, x plot,x poster, x actors, x omdbKey, x director
    var button = $("<button>")

    button.html("Claim It")

    button.attr("keyID", response.imdbID)

    button.attr("title", response.Title)

    button.attr("plot", response.Plot)

    button.attr("poster", response.Poster)

    button.attr("actors", response.Actors)

    button.attr("director", response.Director)

    button.attr("id", "claimMovie")

    movieDiv.append(button)

    button = $("<button>")

    button.html("Go Back")

    button.attr("id", "closeModal")

    movieDiv.append(button)

    $(".movieClicked").append(movieDiv)
    $('#movieSelectedModal').css('display', 'block');
  })
})

$('body').on('click', '#claimMovie', function () {

    //title, loanStatus, loanerID, plot, poster, actors, omdbKey, director
  var data = {
    title: $(this).attr("title"),
    omdbKey:  $(this).attr("keyID"),
    plot: $(this).attr("plot"),
    poster:  $(this).attr("poster"),
    actors: $(this).attr("actors"),
    director: $(this).attr("director"),
    loanStatus: false
  }
  console.log(data)
  $.ajax({
    type: "POST",
    url: "/api/movies",
    data: data,
  });

})

$('body').on('click', '#closeModal', function () {
  $('#movieSelectedModal').css('none');
  $(".movieClicked").empty()
 


})