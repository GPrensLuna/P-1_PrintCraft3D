const { User } = require("../../db");

async function GetUserById(req, res) {

    let {idUser} = req.params
    try {
        const user = await User.findOne({where: {id: idUser}});

        res.status(200).json({
            message: "Users retrieved successfully",
            user: user,
        })
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status(500).json({ error: "Error retrieving users" });
    }
}

module.exports = {
    GetUserById,
};
