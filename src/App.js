// App.jsx
import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import { Login, Inventory, Profile } from "./views";
import NavBar from "./Components/NavBar/NavBar.jsx";
import DetailProduct from "./views/DetailProduct/DetailProduct.jsx";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "./redux/actions/actions.js";
import { URL } from "./config.js"; // Import URL from your config file

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(`${URL}Profile`, {
            method: "GET",
            headers: headers,
          });

          if (response.ok) {
            const data = await response.json();
            dispatch(LoginUser(data));
          } else {
            console.error(
              "Error al obtener los datos del perfil:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error en la solicitud fetch:", error);
      }
    };

    fetchProfileData();
  }, [dispatch]); // Include dispatch as a dependency


  const logout = async () => {
    try {
      // Llamada al endpoint del servidor para realizar el cierre de sesión
      const response = await fetch(`${URL}Logout`, {
        method: "POST", // Utiliza el método correcto (en tu caso, POST)
        headers: {
          "Content-Type": "application/json",
          // Puedes agregar otros encabezados según sea necesario
        },
        // Puedes enviar datos en el cuerpo si es necesario
        // body: JSON.stringify({ key: 'value' }),
      });

      // Verifica si la respuesta es exitosa (código 200)
      if (response.status === 200) {
        // Elimina el token almacenado en localStorage en el lado del cliente
        localStorage.removeItem("token");
        console.log("Cierre de sesión exitoso");
      } else {
        // Muestra un mensaje de error si la respuesta no es exitosa
        console.error(
          "Error durante el cierre de sesión:",
          response.statusText
        );
      }
    } catch (error) {
      // Manejo de errores de red u otros errores
      console.error("Error durante el cierre de sesión:", error.message);
    }
  };
  return (
    <div className="App">
      <NavBar userData={userData} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginUp" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/Producto/:name" element={<DetailProduct />} />
      </Routes>
    </div>
  );
}

export default App;
