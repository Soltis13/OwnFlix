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
  app.post("/register", function(req, res, next) {
    req.checkBody("email", "Please use a valid email.").isEmail();
    req.checkBody("password", "Please use a valid email").notEmpty();
    
    var errors = req.validationErrors();

    if (errors) {
      res.render("index", {title: "Registration error"})
    } else {

    var email = req.body.email;
    var password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
  }
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function() {
      res.json(dbExample);
    });
  });
};
