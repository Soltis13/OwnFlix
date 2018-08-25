var db = require("../models");

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
  app.get("/movies", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("movies", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // added this route to test Dashboard on 8/24/2018
  app.get("/Dashboard", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("Dashboard", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
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
