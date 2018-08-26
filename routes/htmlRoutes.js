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

  app.get('/Dashboard', function(req, res) {
    let userParse = JSON.parse(req.user);
    console.log(userParse.id);
    if (req.user) {
      // Searching for user movies they are borrowing currently
      db.Movie.findAll({
        attributes: ['id', 'title', 'loanStatus', 'loanerID', 'plot', 'poster', 'actors', 'director', 'UserId'],
        where: {
          loanerID: userParse.id,
          loanStatus: true
        }
      }).then(function(borrowingResult) {
        db.Movie.findAll({
          attributes: ['id', 'title', 'loanStatus', 'loanerID', 'plot', 'poster', 'actors', 'director', 'UserId'],
          where: {
            UserID: userParse.id
          }
        }).then(function(ownedResult) {
          console.log(ownedResult);
          console.log(borrowingResult);
          let testData = {cats: 'good', kinds:[
            {kind: 'black', name: 'steve'},
            {kind: 'fat', name: 'john'},
            {kind: 'black', name: 'sam'},
          ]}
          let ownedResultHB = [];
          for (let i = 0; i < ownedResult.length; i++) {
            ownedResultHB.push(ownedResult[i].dataValues);
          }
          console.log('HERE : ')
          console.log(ownedResultHB);
          res.render(
            "Dashboard",
            {rented: borrowingResult, owned: ownedResultHB}
            // testData
            );
          });
      });
    }
    else {
      res.render("404");
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
