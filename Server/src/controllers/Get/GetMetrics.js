const { getSalesBetweenDates, getMostSoldProducts, getMostIncomeProducts } = require("../../utils");

const GetMetrics = async (req, res) => {
  const { limit = 10 } = req.query;
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  const salesBetweenDates = await getSalesBetweenDates(startDate, endDate);
  const mostSoldProducts = getMostSoldProducts(salesBetweenDates, limit);
  const mostIncomeProducts = getMostIncomeProducts(salesBetweenDates, limit);

  res.json({ salesBetweenDates, mostSoldProducts, mostIncomeProducts });
};

module.exports = {
  GetMetrics,
};