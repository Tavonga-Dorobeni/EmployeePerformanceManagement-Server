module.exports = (sequelize, Sequelize) => {
    const Site = sequelize.define("site", {
      SiteID: {
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
        allowNull: false
      },
      Longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      Latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });
  
    return Site;
  };
  