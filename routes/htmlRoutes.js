var db = require("../models");
require("dotenv").config();
var omdb = require("../keys.js");
var request = require("request");

var apiKey = omdb.omdb.id;

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      console.log(req.user); // this is the user cookie (key)
      console.log(req.isAuthenticated()); // checking if we are authenticated will return boolean
      // console.log("Hello - " + req.user.firstName);
      // this would display the logged in user's first name
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // added this route to test movies on 8/22/2018
  app.get("/movies/search/:movie", function(req, res) {
    var queryURL =
      "https://www.omdbapi.com/?s=" +
      req.params.movie +

      "&y=&plot=short&type=movie&apikey=" +
      apiKey;
    request(queryURL, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        res.json(body);
      }
    });
  });

  app.get("/movies/search/title/:id", function(req, res) {
    var queryURL =
      "https://www.omdbapi.com/?i=" + req.params.id + "&apikey=" + apiKey;
    request(queryURL, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        res.json(body);
      }
    });
  });

  app.get("/movies/", function(req, res) {
    userParsed = JSON.parse(req.user);
    db.User.findOne({
      where: {
        id: userParsed.id
      }
    }).then(function(userData) {
      var hbsObject = {
        user: userData
      };
      res.render("movies", hbsObject);
    });
  });

  // added this route to test Dashboard on 8/24/2018
  app.get("/Dashboard", function(req, res) {
    console.log(req.user);
    if (req.user) {
      // Searching for user movies they are borrowing currently
      db.Movie.findAll({
        attributes: [
          "id",
          "title",
          "loanStatus",
          "loanerID",
          "plot",
          "poster",
          "actors",
          "director",
          "UserId"
        ],
        where: {
          loanerID: req.user
        }
      }).then(function(borrowingResult) {
        db.Movie.findAll({
          attributes: [
            "id",
            "title",
            "loanStatus",
            "loanerID",
            "plot",
            "poster",
            "actors",
            "director",
            "UserId"
          ],
          where: {
            UserID: req.user
          }
        }).then(function(ownedResult) {
          res.render("Dashboard", {
            rented: borrowingResult,
            owned: ownedResult
          });
        });
      });
    } else {
      res.render("404");
    }
  });

  // added this route to test Search on 8/24/2018
  app.get("/Search", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("Search", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/movies/:user", function(req, res) {
    db.Movie.findAll({}).then(function(dbExamples) {
      res.render("movies", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function() {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
