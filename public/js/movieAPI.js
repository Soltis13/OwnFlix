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
 var movieKey = $(this).attr("omdbKey")

 var movieTitle = $(this).attr("title")

 var data = {
   title: movieTitle,
   omdbKey: movieKey
 }

 $.ajax({
  type: "POST",
  url: "/api/movies",
  data: data,
});

 })