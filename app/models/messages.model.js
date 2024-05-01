module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("message", {
    MessageID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    SenderID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ReceiverID: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    Message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    DateSent: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    Status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Unread"
    }
  });

  return Message;
};
