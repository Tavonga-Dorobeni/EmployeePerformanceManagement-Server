module.exports = (sequelize, Sequelize) => {
    const TaskSkills = sequelize.define("task_skills", {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      TaskID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      SkillID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return TaskSkills;
  };
  