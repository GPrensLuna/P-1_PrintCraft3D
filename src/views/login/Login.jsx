import axios from "axios";
import React, { useState } from "react";
import style from "./Login.module.css";
import { URL } from "../../config.js";
import Register from "./Register.jsx";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}login`, formData);

      if (response.status === 200) {
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  const mostrarRegistroHandler = () => {
    setMostrarRegistro(!mostrarRegistro); // Toggle the state
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
