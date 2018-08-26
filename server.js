// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
var omdb = require("./keys")
var request = require("request")
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
<<<<<<< HEAD
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var session = require("express-session");
var bcrypt = require("bcrypt");
var expressValidator = require("express-validator");
var db = require("./models");

var saltRounds = 10;

=======
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var expressValidator = require("express-validator");
var Sequelize = require("sequelize");
var passport = require("passport");
//var client = require("./keys.js");
// var Moviedb = require("moviedb");
//var OmdbApi = require('omdb-client');
// var OmdbApi = require('omdb')

// Sets up the Express App
// =============================================================
>>>>>>> 713f44a1c2fc87621d289167f54a720a34f9bc17
var app = express();
var PORT = process.env.PORT || 3000;
var saltRounds = 10;

// Express-Session cookie config
app.use(
  session({
    secret: "somestuffhere", //this is a salt
    resave: false,
    saveUninitialized: false, //prevent cookie unless logged in
    cookie: { secure: false }
  })
);

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

<<<<<<< HEAD
app.use(session({
  secret: "somestuffhere",
  resave: false,
  saveUninitialized: false
  // cookie: {secure: true}
}));

//fake user
var users = [
  {
    id: "123xyz",
    email: "test@test.com",
    password: "password"
  }
];

// Login with local strategy
passport.use(new LocalStrategy(
  {usernameField: "email"},
  function(email, password, done){
    //inside the local strategy callback
    //here we make the call to the db
    //to find the user based on their email
    //something like User.findById(email).then(user =>{check creds})
    //pretend we have it
    var user = users[0];
    if(email === user.email && password === user.password) {
      return done(null, user);
    } else {
      console.log("incorrect login");
    }
  }
));


passport.serializeUser(function(user, done){
  console.log("User id is saved to the session file here")
  done(null, user.id);
})

=======
// // Express-Session cookie config
// app.use(session({
//   secret: "somestuffhere", //this is a salt
//   resave: false,
//   saveUninitialized: false, //prevent cookie unless logged in
//   cookie: {secure: false}
// }));
>>>>>>> 713f44a1c2fc87621d289167f54a720a34f9bc17

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false }; 

//access the keys
// var clientmoviedb = new Moviedb(client.moviedb);
// var clientomdb=  new OmdbApi(client.omdb);

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
