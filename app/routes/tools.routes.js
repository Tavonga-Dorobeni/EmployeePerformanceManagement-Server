module.exports = app => {
    const tools = require("../controllers/tools.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tool
    router.post("/", tools.create);
  
    // Retrieve all Tools
    router.get("/", tools.findAll);
  
    // Retrieve a single Tool with id
    router.get("/:id", tools.findOne);
  
    // Update a Tool with id
    router.put("/:id", tools.update);
  
    // Delete a Tool with id
    router.delete("/:id", tools.delete);
  
    // Delete all Tools
    router.delete("/", tools.deleteAll);
  
    app.use('/api/tools', router);
  };
  