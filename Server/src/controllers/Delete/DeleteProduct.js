const { Product } = require('../../db')

const DeleteProduct = async (req, res) => {
  try {
    const { idProduct } = req.params;
    const product = await Product.findByPk(idProduct);

    if (!product || product.deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    product.deleted = true;
    await product.save();

    const products = await Product.findAll({
      where: { deleted: false }, 
    });

    return res.status(200).json({
      
      message: 'producto eliminado',
      products
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  DeleteProduct
}
