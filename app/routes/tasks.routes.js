module.exports = app => {
    const tasks = require("../controllers/tasks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tasks
    router.post("/", tasks.create);
  
    // Retrieve all Taskss
    router.get("/", tasks.findAll);
  
    // Retrieve a single Tasks with id
    router.get("/:id", tasks.findOne);
  
    // Update a Tasks with id
    router.put("/:id", tasks.update);
  
    // Delete a Tasks with id
    router.delete("/:id", tasks.delete);
  
    // Delete all Taskss
    router.delete("/", tasks.deleteAll);
  
    app.use('/api/tasks', router);
  };
  