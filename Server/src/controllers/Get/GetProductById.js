const { Product, Reviews } = require("../../db");

const GetProductById= async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
       where: { id },
       include: {
        model: Reviews,
        attributes: ['description', 'UserId', 'score'], // Asegúrate de que estás utilizando las columnas correctas
      }});

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
    GetProductById,
};
