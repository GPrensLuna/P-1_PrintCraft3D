require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_URL } = require("./config.js");

const sequelize = new Sequelize(`${DB_URL}`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
const entries = Object.entries(sequelize.models);
const capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Product,
  User,
  Favorite,
  ShoppingCart,
  Order,
  Reviews,
  Cart_Product,
  Order_Product,
} = sequelize.models;

Reviews.belongsTo(User);
User.hasMany(Reviews);
Reviews.belongsTo(Product);
Product.hasMany(Reviews);

User.hasMany(Favorite);
Favorite.belongsTo(User);

Product.hasMany(Favorite);
Favorite.belongsTo(Product);

User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

// ShoppingCart.belongsToMany(Product, { through: "Cart_Product" });
// Product.belongsToMany(ShoppingCart, { through: "Cart_Product" });
ShoppingCart.belongsToMany(Product, { through: Cart_Product });
Product.belongsToMany(ShoppingCart, { through: Cart_Product });

// Order.belongsToMany(Product, { through: "Order_Product" });
// Product.belongsToMany(Order, { through: "Order_Product" });
Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
