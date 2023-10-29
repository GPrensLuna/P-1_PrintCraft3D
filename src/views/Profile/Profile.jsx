import { useState, useEffect } from "react";
import { URL } from "../../config.js";

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
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
          const response = await fetch(`${URL}Profile`, {
            method: "GET",
            headers: headers,
          });

          if (response.ok) {
            // Si la respuesta es exitosa, obtener los datos del usuario
            const data = await response.json();
            // Actualizar el estado con los datos del usuario
            setUserData(data);
          } else {
            console.error(
              "Error al obtener los datos del perfil:",
              response.statusText
            );
            // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
          }
        }
      } catch (error) {
        console.error("Error en la solicitud fetch:", error);
        // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
      }
    };

    // Llamar a la función de obtención de datos del perfil
    fetchProfileData();
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
