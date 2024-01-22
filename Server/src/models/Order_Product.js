const { DataTypes } = require("sequelize");
const Order = require("./Order");
const Product = require("./Product");

module.exports = (sequelize) => {
  sequelize.define(
    "Order_Product",
    {
      OrderId: {
        type: DataTypes.INTEGER,
        references: {
          model: Order,
          key: "id",
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: {
          model: Product,
          key: "id",
        },
      },
      cantidad: {
        type: DataTypes.INTEGER,
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
      },
    },
    { timestamps: true }
  );
};
