const { Op } = require("sequelize");
const { Product, Reviews} = require("../../db");
const { URL_FONT } = require("../../config.js");

const GetInventario = async (req, res) => {
  try {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 12;
    const offset = (currentPage - 1) * limit;

    const { material, category, minPrice, maxPrice, tamaño, search } =
      req.query;
    const filterCriteria = {};

    filterCriteria.material = material || { [Op.not]: null };
    filterCriteria.category = category || { [Op.not]: null };
    filterCriteria.size = tamaño || { [Op.not]: null };
    if (minPrice && maxPrice && !isNaN(minPrice) && !isNaN(maxPrice)) {
      filterCriteria.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    }

    if (search) {
      filterCriteria.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    const {count, rows: products} = await Product.findAndCountAll({
      where: { ...filterCriteria, deleted: false },
      limit,
      offset,
      include: { model: Reviews },
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron productos." });
    }

    const baseUrl = `${URL_FONT}Inventario`;
    const nextPage = `${baseUrl}?page=${currentPage + 1}&limit=${limit}`;
    const previousPage = `${baseUrl}?page=${Math.max(
      1,
      currentPage - 1
    )}&limit=${limit}`;

    return res.status(200).json({
      count: count,
      currentPage,
      limit,
      nextPage,
      previousPage,
      results: products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Hubo un error al recuperar los productos." });
  }
};

module.exports = {
  GetInventario,
};
