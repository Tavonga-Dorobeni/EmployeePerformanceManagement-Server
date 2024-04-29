module.exports = app => {
    const tasks = require("../controllers/tasks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Task Activity
    router.post("/", tasks.createTaskActivity);

    // Retrieve all Task Activities
    router.get("/", tasks.findAllTaskActivities);
  
    // Retrieve a single Task Activity with id
    router.get("/:id", tasks.findOneTaskActivity);
  
    // Update a Task Activity with id
    router.put("/:id", tasks.updateTaskActivity);
  
    // Delete a Task Activity with id
    router.delete("/:id", tasks.deleteTaskActivity);
  
    app.use('/api/task_activities', router);
  };
  