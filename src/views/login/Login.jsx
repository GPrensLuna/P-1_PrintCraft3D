import React, { useState } from "react";
import style from "./Login.module.css";
import Register from "../Register/Register.jsx";
import { URL } from "../../config.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;

        if (!token) {
          setError("El token no está presente en la respuesta del servidor");
          alert("Inicio de sesión fallido");
        } else {
          localStorage.setItem("token", token);
          window.location.href = "/Profile";
        }
      } else {
        const errorData = await response.json();

        if (response.status === 403 && errorData.blocked) {
          setError("La cuenta está bloqueada. Por favor, contacta al soporte.");
        } else {
          setError(errorData.error || errorData.message);
        }
      }
    } catch (error) {
      setError("Se produjo un error durante el inicio de sesión");
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

              {/* Display error message */}
              {error && (
                <div id="errorContainer" style={{ color: "red" }}>
                  {error}
                </div>
              )}

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
