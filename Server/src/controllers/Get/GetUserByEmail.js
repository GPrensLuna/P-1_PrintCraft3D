const { User } = require("../../db");

async function GetUserByEmail(req, res) {
  let { userEmail } = req.params;
  try {
    const user = await User.findOne({
      where: { email: userEmail },
      attributes: ["id"],
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
}

module.exports = {
  GetUserByEmail,
};
