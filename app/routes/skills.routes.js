module.exports = app => {
    const skills = require("../controllers/skills.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Skill
    router.post("/", skills.create);
  
    // Retrieve all skills
    router.get("/", skills.findAll);
  
    // Retrieve a single Skill with id
    router.get("/:id", skills.findOne);
  
    // Update a Skill with id
    router.put("/:id", skills.update);
  
    // Delete a Skill with id
    router.delete("/:id", skills.delete);
  
    // Delete all skills
    router.delete("/", skills.deleteAll);
  
    app.use('/api/skills', router);
  };
  