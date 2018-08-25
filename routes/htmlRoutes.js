var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get('/dashboard', function(req, res) {
    if (req.session.userID) {
      // Searching for user movies they are borrowing currently
      db.Movie.findAll({
        attributes: ['id', 'title', 'loanStatus', 'loanerID', 'plot', 'poster', 'actors', 'director', 'UserId'],
        where: {
          loanerID: req.session.userID
        }
      }).then(function(borrowingResult) {
        db.Movie.findAll({
          attributes: ['id', 'title', 'loanStatus', 'loanerID', 'plot', 'poster', 'actors', 'director', 'UserId'],
          where: {
            UserID: req.session.userID
          }
        }).then(function(ownedResult) {
          res.render(
            "dashboard",
            {rented: borrowingResult, owned: ownedResult}
            );
          });
      });
    }
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
