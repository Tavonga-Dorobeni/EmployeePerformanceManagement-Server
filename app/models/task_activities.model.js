module.exports = (sequelize, Sequelize) => {
    const TaskActivities = sequelize.define("task_activities", {
      TaskActivityID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TaskID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Activity: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Date: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  
    return TaskActivities;
  };
  