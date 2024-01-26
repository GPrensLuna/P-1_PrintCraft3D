const { Product, Material, Category, Size } = require("../../db.js");
const { Op } = require("sequelize");
const { URL_FONT } = require("../../config.js");

const GetProductsByName = async (req, res) => {
  let name = req.params.name;

  const currentPage = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const offset = (currentPage - 1) * limit;

  const baseUrl = `${URL_FONT}Inventario`;
  const nextPage = `${baseUrl}?page=${currentPage + 1}&limit=${limit}`;
  const previousPage = `${baseUrl}?page=${Math.max(
    1,
    currentPage - 1
  )}&limit=${limit}`;

  try {
    let products = await Product.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Material, Category],
      limit,
      offset,
    });
    const dataProducts = products.rows.map((product) => {
      const mappedProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        stock: product.stock,
        deleted: product.deleted,
        size: product.size,
        material: product.material,
        category: product.category,
      };

      return mappedProduct;
    });

    if (products.count === 0) {
      res.status(404).send({ message: "No hay productos con ese nombre" });
    } else {
      res.status(200).send({
        count: products.count,
        currentPage,
        limit,
        nextPage,
        previousPage,
        results: dataProducts,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { GetProductsByName };
