module.exports = app => {
    const sites = require("../controllers/sites.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Site
    router.post("/", sites.create);
  
    // Retrieve all Sites
    router.get("/", sites.findAll);
  
    // Retrieve a single Site with id
    router.get("/:id", sites.findOne);
  
    // Update a Site with id
    router.put("/:id", sites.update);
  
    // Delete a Site with id
    router.delete("/:id", sites.delete);
  
    // Delete all Sites
    router.delete("/", sites.deleteAll);
  
    app.use('/api/sites', router);
  };
  