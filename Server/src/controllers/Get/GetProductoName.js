const { Product } = require("../../db");

const GetProductoName = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await Product.findOne({ where: { name } });

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).send({ message: "There was an error: " + e.message });
  }
};

module.exports = {
  GetProductoName,
};
