module.exports = app => {
    const sections = require("../controllers/sections.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Section
    router.post("/", sections.create);
  
    // Retrieve all Sections
    router.get("/", sections.findAll);
  
    // Retrieve a single Section with id
    router.get("/:id", sections.findOne);
  
    // Update a Section with id
    router.put("/:id", sections.update);
  
    // Delete a Section with id
    router.delete("/:id", sections.delete);
  
    // Delete all Sections
    router.delete("/", sections.deleteAll);
  
    app.use('/api/sections', router);
  };
  