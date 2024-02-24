module.exports = app => {
    const tool_types = require("../controllers/tool_types.controller.js");
  
    var router = require("express").Router();
  
    // Create a new ToolType
    router.post("/", tool_types.create);
  
    // Retrieve all ToolTypes
    router.get("/", tool_types.findAll);
  
    // Retrieve a single ToolType with id
    router.get("/:id", tool_types.findOne);
  
    // Update a ToolType with id
    router.put("/:id", tool_types.update);
  
    // Delete a ToolType with id
    router.delete("/:id", tool_types.delete);
  
    // Delete all ToolTypes
    router.delete("/", tool_types.deleteAll);
  
    app.use('/api/tool_types', router);
  };
  