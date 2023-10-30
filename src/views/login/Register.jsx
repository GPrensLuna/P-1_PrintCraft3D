import axios from "axios";
import React, { useState } from "react";
import style from "./Login.module.css";
import { URL } from "../../config.js";
import Login from "./Login";

let mostrarLoginState = false;

export default function Registering() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    userRole: "Client", // Moved userRole here
  });
  const [mostrarLogin, setMostrarLogin] = useState(mostrarLoginState);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    try {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      const response = await axios.post(`${URL}Registro`, formData);

      if (response.status === 201) {
        alert("Registro exitoso");
      } else {
        alert("Hubo un error en el registro");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const mostrarLoginHandler = () => {
    setMostrarLogin(true);
  };

  return (
    <div>
      {mostrarLogin ? (
        <Login />
      ) : (
        <div className={style.formBackground}>
          <div className={style.formContainerRegister}>
            <form className={style.loginForm} onSubmit={handleFormSubmit}>
              <h2 className={style.loginF}>REGISTRO</h2>

              <div className={style.logiConten}>
                <label htmlFor="firstName" className={style.formLabel}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={style.formInput}
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className={style.logiConten}>
                <label htmlFor="lastName" className={style.formLabel}>
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={style.formInput}
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div className={style.logiConten}>
                <label htmlFor="birthDate" className={style.formLabel}>
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className={style.formInput}
                  required
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                />
              </div>

              <div className={style.logiConten}>
                <label htmlFor="phoneNumber" className={style.formLabel}>
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className={style.formInput}
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                />
              </div>

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

              <div className={style.submitButtonConten}>
                <button className={style.submitButton}>REGISTRAR</button>
              </div>

              <h4 className={style.subButton}>
                ¿Ya tienes una cuenta?
                <span onClick={mostrarLoginHandler}>Iniciar sesión</span>
              </h4>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
