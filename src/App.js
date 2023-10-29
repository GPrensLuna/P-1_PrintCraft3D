// App.jsx
import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import { Login, Inventory, Profile, UserList } from "./views";
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
  localStorage.removeItem("token");
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  window.location.href = "/LoginUp";
};
  return (
    <div className="App">
      <NavBar userData={userData} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginUp" element={<Login />} />
        <Route path="/Profile" element={<Profile userData={userData} />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/Producto/:name" element={<DetailProduct />} />
      </Routes>
    </div>
  );
}

export default App;
