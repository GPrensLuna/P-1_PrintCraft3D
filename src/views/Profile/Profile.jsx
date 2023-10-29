/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { URL } from "../../config.js";
import { useDispatch, useSelector } from "react-redux";

import { LoginUser } from "../../redux/actions/actions.js";

export default function Profile() {
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
  }, []);

  return (
    <div>
      <h1>Componente de Perfil</h1>
      {userData ? (
        <div>
          <p>Hola {userData.email}, bienvenido a tu perfil</p>
          <p>Hola {userData.name}, bienvenido a tu perfil</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}
