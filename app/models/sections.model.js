module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define("section", {
      SectionID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  
    return Section;
  };
  