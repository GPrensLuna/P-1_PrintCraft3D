const { Product,
  } = require("../../db");

const GetProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      stock: product.stock,
      deleted: product.deleted ? true : false,
      size: product.size,
      material: product.material,
      category: product.category,
    }));

    res.json(formattedProducts);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = { GetProducts };
