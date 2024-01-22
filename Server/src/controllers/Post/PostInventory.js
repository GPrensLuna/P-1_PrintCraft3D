const { Product } = require("../../db");
const { dummieData } = require("./dummieData");

async function PostInventory(req, res) {
  try {
    const {
      
      name,
      image,
      description,
      price,
      stock,
      size,
      material,
      category,
    } = req.body;

    if (!name || !price || !stock) {
      return res
        .status(400)
        .json({ mensaje: "Todos los campos son obligatorios." });
    }

    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      return res.status(400).json({ mensaje: "El producto ya existe." });
    }

    const newProduct = await Product.create({
      name,
      image,
      description,
      price,
      stock,
      size,
      material,
      category,
    });

    return res.status(201).json({
      mensaje: "Producto creado exitosamente.",
      producto: newProduct,
    });
  } catch (error) {
    //console.error(error);
    return res
      .status(500)
      .json({ mensaje: "Hubo un error al crear el Producto." });
  }
}
async function createProductsFromDummyData() {
  const resultados = [];

  for (const productData of dummieData) {
    try {
      const req = { body: productData };
      const res = {
        status: (code) => ({
          json: (data) => {
            resultados.push({ code, data });
          },
        }),
      };

      await PostInventory(req, res);
    } catch (error) {}
  }
}

module.exports = {
  PostInventory,
  createProductsFromDummyData,
};
createProductsFromDummyData();
