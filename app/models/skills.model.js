module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
      SkillID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Skill;
  };
  