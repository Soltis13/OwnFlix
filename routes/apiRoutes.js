var db = require("../models");
var User = require("../models/user.js")
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var path = require("path");


module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.post('/login', (req, res, next) => {
    // console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      // console.log('Inside passport.authenticate() callback');
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        // console.log('Inside req.login() callback')
        // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        // console.log(`req.user: ${JSON.stringify(req.user)}`)
        // return res.send('You were authenticated & logged in!\n');
        // res.redirect("/dashboard");
        res.sendFile("UserPage.html", { root: path.join(__dirname, '../Development') });
      })
    })(req, res, next);
  })

  // Create a new example
  //began working on a POST for a user
  app.post("/api/user", function(req, res) {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function() {
      res.json(dbExample);
    });
  });
};
