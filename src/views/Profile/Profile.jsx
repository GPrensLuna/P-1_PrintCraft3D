import { useState, useEffect } from "react";
import { URL } from "../../config.js";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem("token");

    // Verificar si hay un token antes de realizar la solicitud
    if (token) {
      // Configurar los encabezados de la solicitud con el token
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("Token enviado al servidor:", token);
      console.log("Encabezados de la solicitud:", headers);

      // Realizar la solicitud fetch al servidor
      fetch(`${URL}Profile`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          // Actualizar el estado con los datos del usuario
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del perfil:", error);
          // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
        });
    }
  }, []); // El segundo argumento vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Componente de Perfil</h1>
      {userData ? (
        <div>
          <p>Hola {userData.nombre}, bienvenido a tu perfil</p>
          {/* Mostrar otros detalles del perfil según la respuesta de la solicitud fetch */}
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}
