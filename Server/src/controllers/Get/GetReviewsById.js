const { Reviews, Product, User } = require("../../db");

const GetReviewsById = async (req, res) => {
    try {
        let {idProduct} = req.params
        let {count, rows} = await Reviews.findAndCountAll({where: {ProductId: idProduct}})
        console.log(count);
        if (rows){
            res.status(200).json({message: "Reviews succesfully retrieved", reviews: rows, count: count})
        }
        else {
            res.status(404).json({message: "Reviews not found", reviews: []});
        }
    } catch (error) {
        console.log(error.message);
        console.log(error.stack);
        res.status(500).json(error.message);
    }
}

module.exports = {GetReviewsById}