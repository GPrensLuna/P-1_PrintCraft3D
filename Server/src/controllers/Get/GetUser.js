const { User } = require("../../db");

async function GetUser(req, res) {
  try {
    const users = await User.findAll();

    if (users && users.length > 0) {
      const formattedUsers = users.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          birthDate: user.birthDate,
          phoneNumber: user.phoneNumber,
          email: user.email,
          password: user.password,
          creationDate: user.creationDate,
          deleted: user.deleted ? true : false,
          roll: user.roll
        };
      });

      res.status(200).json({
        message: "Users retrieved successfully",
        users: users,
      });
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
}

module.exports = {
  GetUser,
};
