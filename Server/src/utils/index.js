const { Op } = require("sequelize");
const { Product, Order } = require("../db");

const getSalesBetweenDates = (startDate, endDate) => {
  return Order.findAll({
    include: [
      {
        model: Product,
      },
    ],
    where: {
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
};

const getMostSoldProducts = (salesBetweenDates, limit) => {
  const mostSoldProducts = salesBetweenDates
    .map((order) => order.Products)
    .flat()
    .reduce((acc, product) => {
      const foundProduct = acc.find((p) => p.id === product.id);
      if (foundProduct) {
        foundProduct.cantidad += product.Order_Product.cantidad;
      } else {
        acc.push({
          id: product.id,
          name: product.name,
          description: product.description,
          cantidad: product.Order_Product.cantidad,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, limit);

  return mostSoldProducts;
};

const getMostIncomeProducts = (salesBetweenDates, limit) => {

    const mostSoldProducts = salesBetweenDates
    .map((order) => order.Products)
    .flat()
    .reduce((acc, product) => {
      const foundProduct = acc.find((p) => p.id === product.id);
      if (foundProduct) {
        foundProduct.totalIncome += parseFloat(product.Order_Product.subtotal);
      } else {
        acc.push({
          id: product.id,
          name: product.name,
          description: product.description,
          totalIncome: parseFloat(product.Order_Product.subtotal),
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.totalIncome - a.totalIncome)
    .slice(0, limit);

  return mostSoldProducts;
  };

module.exports = {
  getSalesBetweenDates,
  getMostSoldProducts,
  getMostIncomeProducts
};