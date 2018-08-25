// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var expressValidator = require("express-validator");
var Sequelize = require("sequelize");
var passport = require("passport");
var client = require("./keys.js");
var Moviedb = require("moviedb");
var OmdbApi = require('omdb-client');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
var saltRounds = 10;

// Express-Session cookie config
app.use(session({
  secret: "somestuffhere", //this is a salt
  resave: false,
  saveUninitialized: false, //prevent cookie unless logged in
  cookie: {secure: false}
}));

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());

// // Express-Session cookie config
// app.use(session({
//   secret: "somestuffhere", //this is a salt
//   resave: false,
//   saveUninitialized: false, //prevent cookie unless logged in
//   cookie: {secure: false}
// }));

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
var clientmoviedb = new Moviedb(client.moviedb);
//var clientomdb= new OmdbApi(client.omdb);

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
