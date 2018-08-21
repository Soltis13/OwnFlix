var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.json(dbExamples);
    // });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    // db.Example.create(req.body).then(function(dbExample) {
    //   res.json(dbExample);
    // });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
<<<<<<< HEAD
  });
=======
  // });
<<<<<<< HEAD
>>>>>>> 60a9c8d47a270681e39216e8b6b2322d30f5277a
=======
>>>>>>> cb81a1af7f0debd1e49de44f91d2186d8f43e47d
};
