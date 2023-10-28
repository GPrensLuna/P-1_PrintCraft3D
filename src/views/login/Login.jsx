import React, { useState } from "react";
import style from "./Login.module.css";
import Register from "./Register.jsx";
import { URL } from "../../config.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la información de correo electrónico y contraseña al servidor usando fetch
      const response = await fetch(`${URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Obtener el token del encabezado de la respuesta
        const token = response.headers.get("Authorization");

        // Almacenar el token en el almacenamiento local
        localStorage.setItem("token", token);

        // Redirigir al usuario a la página de inicio (o a donde desees)
        window.location.href = "/home";
      } else {
        const errorData = await response.json(); // Intenta parsear la respuesta como JSON
        console.error("Error en la respuesta:", errorData);
        alert("Inicio de sesión fallido");
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      alert("Se produjo un error durante el inicio de sesión");
    }
  };

  const mostrarRegistroHandler = () => {
    setMostrarRegistro(!mostrarRegistro);
  };

  return (
    <div>
      {mostrarRegistro ? (
        <Register />
      ) : (
        <div className={style.formBackground}>
          <div className={style.formContainer}>
            <form className={style.loginForm} onSubmit={handleFormSubmit}>
              <h2 className={style.loginF}>LOGIN</h2>

              {/* Email input */}
              <div className={style.logiConten}>
                <label htmlFor="email" className={style.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={style.formInput}
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Password input */}
              <div className={style.logiConten}>
                <label htmlFor="password" className={style.formLabel}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={style.formInput}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              {/* Submit button */}
              <div className={style.submitButtonConten}>
                <button type="submit" className={style.submitButton}>
                  INICIAR
                </button>
              </div>

              {/* Registration link */}
              <h4 className={style.subButton}>
                ¿Aún no te has registrado?
                <span
                  onClick={mostrarRegistroHandler}
                  className={style.registerLink}
                >
                  {" "}
                  Regístrate
                </span>
              </h4>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
