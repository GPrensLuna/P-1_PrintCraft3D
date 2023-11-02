import logo from "../../imagenes/logo.png";
import React, { useState } from "react";

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
          console.error(
            "El token no está presente en la respuesta del servidor"
          );
          alert("Inicio de sesión fallido");
        } else {
          localStorage.setItem("token", token);

          // Accede al token almacenado y decódificalo

          window.location.href = "/Profile";
        }
      } else {
        const errorData = await response.json();

        if (response.status === 403 && errorData.blocked) {
          console.error("Cuenta bloqueada");
          alert("La cuenta está bloqueada. Por favor, contacta al soporte.");
        } else {
          console.error("Error en la respuesta:", errorData);
          alert("Inicio de sesión fallido");
        }
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
    <div className="container-lg">
      {mostrarRegistro ? (
        <Register />
      ) : (
        <div className="row w-100">
          <div className="col w-50 mt-4">
            <img src={logo} className="img-fluid w-100" alt="Logo" />
          </div>

          <div className="col w-50">
            <form className="text-start w-75 pl-4"  onSubmit={handleFormSubmit}>
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-arrow-left-short"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </div>
              <h2 className="fw-bold text-center pt-5 mb-5">Bienvenido</h2>
              {/* Label */}
              <div className="mb-4">
                <label htmlFor="email" for="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" for="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="mb-4 form-check">
                <input
                  type="checkbox"
                  name="connected"
                  className="form-check-input"
                />
                <label for="connected" className="form-check-label">
                  Mantenerme conectado
                </label>
              </div>

              {/* Boton */}
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Iniciar Sesion
                </button>
              </div>

              <div className="my-3">
                <span>
                  ¿No tienes Cuenta?{" "}
                  <span onClick={mostrarRegistroHandler} className="">
                    {" "}
                    Registrate
                  </span>
                </span>
                <br />
                <span className="pe-auto" aria-disabled="true">
                  Recuperar Password
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
