const PostLogout = (req, res) => {
  try {
    localStorage.removeItem("token");

    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error durante el cierre de sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  PostLogout,
};
