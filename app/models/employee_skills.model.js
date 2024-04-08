module.exports = (sequelize, Sequelize) => {
    const EmployeeSkills = sequelize.define("employee_skills", {
      ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      EmployeeID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      SkillID: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return EmployeeSkills;
  };
  