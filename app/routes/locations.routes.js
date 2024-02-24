module.exports = app => {
    const locations = require("../controllers/locations.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Location
    router.post("/", locations.create);
  
    // Retrieve all Locations
    router.get("/", locations.findAll);
  
    // Retrieve a single Location with id
    router.get("/:id", locations.findOne);
  
    // Update a Location with id
    router.put("/:id", locations.update);
  
    // Delete a Location with id
    router.delete("/:id", locations.delete);
  
    // Delete all Locations
    router.delete("/", locations.deleteAll);
  
    app.use('/api/locations', router);
  };
  