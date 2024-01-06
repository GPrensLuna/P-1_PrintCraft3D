const { Product, Material, Category, Size } = require("../../db");

const PutProducts = async (req, res) => {
  const {
    name,
    image,
    description,
    price,
    stock,
    deleted,
    size,
    material,
    category,
  } = req.body;
  const productId = req.params.productId;

  try {
    const productToUpdate = await Product.findByPk(productId);

    if (!productToUpdate) {
      return res.status(404).json({ error: "Product not found" });
    }

    productToUpdate.name = name;
    productToUpdate.image = image;
    productToUpdate.description = description;
    productToUpdate.price = price;
    productToUpdate.stock = stock;
    productToUpdate.size = size;
    productToUpdate.material = material;
    productToUpdate.category = category;
    productToUpdate.deleted = deleted;

    await productToUpdate.save();

    res.json(productToUpdate);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

module.exports = { PutProducts };
