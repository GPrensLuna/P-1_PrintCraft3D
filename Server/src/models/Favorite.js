const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Favorite",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // userID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // productID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    { timestamps: false }
  );
};
