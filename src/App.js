/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./views/Home/Home.jsx";
import { Login, Inventory, Profile, UserList, ProductList } from "./views";
import NavBar from "./Components/NavBar/NavBar.jsx";
import DetailProduct from "./views/DetailProduct/DetailProduct.jsx";
import PagoPaypal from "./Components/PagoPaypal/PagoPaypal";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "./redux/actions/actions.js";
import { URL } from "./config.js";
import "./App.css";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";

import Register from "../src/views/Register/Register.jsx";


//hola

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          // No token available, handle it gracefully (e.g., redirect to login page)
          //console.log("No user token available. Redirect to login page.");
          return;
        }
  
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
        } else if (response.status === 401) {
          // Handle unauthorized access, e.g., by redirecting to login page
          //console.log("Unauthorized access. Redirect to login page.");
        } else {
          // Only log errors to the console when the user is attempting to log in
          if (response.url.endsWith("login-endpoint")) {
            //console.error(
            //  "Error al obtener los datos del perfil:",
             // response.statusText
            //);
          }
        }
      } catch (error) {
        // Only log errors to the console when the user is attempting to log in
        //console.error("Error en la solicitud fetch:", error);
      }
    };
  
    fetchProfileData();
  }, [dispatch]);


  const logout = async () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/LoginUp";
  };

  


  const logout = async () => {
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    // Redirect to the login page or show a confirmation message
    window.location.href = "/LoginUp";
  };
  


  return (
    <div className="App row justify-content-center">
      {pathname !== "/LoginUp" && pathname !== "/Inventario" && <NavBar userData={userData} logout={logout} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Carrito" element={<ShoppingCart />}></Route>
        <Route path="/LoginUp" element={<Login />} />
        <Route path="/Profile" element={<Profile userData={userData} />} />
        <Route path="/Inventario" element={<Inventory />} />
        <Route path="/Pagar" element={<PagoPaypal />}></Route>
        <Route path="/UserList" element={<UserList />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/Producto/:name" element={<DetailProduct />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
