
import logo from "../../imagenes/logo.png";
import LoginRedSocial from "../../Components/LoginRedSocial/LoginRedSocial.jsx";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

import React, { useState } from "react";
import style from "./Login.module.css";
import Register from "../Register/Register.jsx";

import { URL } from "../../config.js";
import Swal from "sweetalert2";
import BotonAtras from "../../Components/BotonAtras/BotonAtras.jsx";



export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo inválido")
        .required("Espacio obligatorio"),
      password: Yup.string()
        .min(6, "Debe tener mínimo 6 caracteres")
        .required("Espacio obligatorio"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${URL}login`, values);

        if (response.status === 200) {
          navigate("/");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Iniciando sesion",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            title: "Inicio de sesión Fallido",
            text: "That thing is still around?",
            icon: "error",
            confirmButtonText: "OK",
          });

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
      } catch (error) {
        console.error("Error durante el inicio de sesión:", error);

        Swal.fire({
          title: "Inicio de sesión Fallido",
          text: "Email o Password incorrecta",
          icon: "error",
          confirmButtonText: "OK",
        });
      }

    },
  });

  return (
    <div className="container-lg">
      <div className="row w-100 d-flex justify-content-center">
        <div className="col w-50 h-50 mt-4 rounded-3">
          <img src={logo} className="img-fluid w-100" alt="Logo" />
        </div>

        <div className="d-flex justify-content-center align-items-center w-50 ps-3 py-4">
          <form
            className="text-start w-75 ms-4 ps-4 needs-validation"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <Link to="/">
              <BotonAtras/>
            </Link>

            <h2 className="fw-bold text-center pt-1 mb-2">Bienvenido</h2>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Example@example.com"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger m-1">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password..."
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger m-1">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-4 form-check">
              <input
                type="checkbox"
                name="connected"
                className="form-check-input"
              />
              <label htmlFor="connected" className="form-check-label">
                Mantenerme conectado
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </div>

            <div className="my-3">
              <span>
                ¿No tienes Cuenta? <Link to="/Register">Regístrate</Link>
              </span>

              <br />
              <span className="pe-auto" aria-disabled="true">
                <Link>Recuperar Contraseña</Link>
              </span>
            </div>

            <LoginRedSocial />
          </form>

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
      </div>
    </div>
  );
}
