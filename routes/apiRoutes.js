var db = require("../models");
var User = require("../models/user.js")
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");


module.exports = function(app) {
  // Get all examples

  //ROUTES
//signin
//createuser
//userdashboard
//moviesearch

  app.get("/login", function(req, res) {
    //send user to login page/modal
    res.send(`<form action="/login" method="POST" style="text-align: center"><input type="text" name="email" placeholder="Email"><input type="password" name="password" placeholder="Password"><input type="submit" name="login" class="login loginmodal-submit" value="Login"></form>`);
  });

  app.post('/login', (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      // console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      // console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        return res.send('You were authenticated & logged in!\n');
      })
    })(req, res, next);
  })

  // Create a new example
  app.post("/createuser", function(req, res) {
    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
    console.log(req.body);
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function(data) {
      res.end();
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  });
  // });
};
