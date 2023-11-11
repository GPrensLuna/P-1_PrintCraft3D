
import axios from "axios";
import React, { useEffect, useState } from "react";
// import style from "./Login.module.css";
import { URL } from "../../config.js";
import Login from "../login/Login";

import validation from '../login/validation';

let mostrarLoginState = false;

export default function Registering() {
  const [formData, setFormData] = useState({

/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../login/Login.module.css";
import { URL } from "../../config.js";
import Login from "../login/Login";
import validation from "../login/validation.js";

export default function Registering() {
  const initialState = {

    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",

    roll: "Client", // Moved userRole here
  });

      //estado donde se actualizan los errores del formulario
      const [errors, setErrors]= useState({});

      //se renderizan los errores al cargar el componente
      useEffect (() => {
          setErrors(validation({
              firstName : formData.firstName,
              lastName : formData.lastName,
              birthDate : formData.birthDate,
              phoneNumber : formData.phoneNumber,
              email : formData.email,
              password : formData.password,
          }));
      }, []);

  const [mostrarLogin, setMostrarLogin] = useState(mostrarLoginState);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!errors.firstName && !errors.lastName && !errors.birthDate && !errors.email && !errors.phoneNumber && !errors.password){
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
      
    }
     catch (error) {
      console.error("Error:", error);
    }
  }
  else {
    alert("Hay campos invalidos.")
  }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    }
    )

    setErrors(validation({
      ...formData,
      [name] : value,
  }));

    roll: "Client",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validation(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors(
      validation({
        ...formData,
        [name]: value,
      })
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).every((key) => !errors[key])) {
      try {
        const response = await axios.post(`${URL}Registro`, formData);

        if (response.status === 201) {
          alert("Registro exitoso");
          setFormData(initialState);
        } else {
          alert("Hubo un error en el registro");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Hay campos inválidos.");
    }

  };

  const mostrarLoginHandler = () => {
    setMostrarLogin(true);
  };


  return (
    <div>
      {mostrarLogin ? (
        <Login />
      ) : (
        <div className="">
          <div className="">
            <form className="" onSubmit={handleFormSubmit}>
              <h2 className="">REGISTRO</h2>

              <div className="">
                <label htmlFor="firstName" className="">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className=""
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName ? <p className="" style={{color: 'red'}}>{errors.firstName}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Nombre válido</p>}
              </div>

              <div className="">
                <label htmlFor="lastName" className="">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className=""
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName ? <p className="" style={{color: 'red'}}>{errors.lastName}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Apellido válido</p>}
              </div>

              <div className="">
                <label htmlFor="birthDate" className="">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className=""
                  required
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
                {errors.birthDate ? <p className="" style={{color: 'red'}}>{errors.birthDate}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Fecha válida</p>}
              </div>

              <div className="">
                <label htmlFor="phoneNumber" className="">
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className=""
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                {errors.phoneNumber ? <p className="" style={{color: 'red'}}>{errors.phoneNumber}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Número válido</p>}
              </div>

              <div className="">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className=""
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email ? <p className="" style={{color: 'red'}}>{errors.email}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Email válido</p>}
              </div>

              <div className="">
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className=""
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {errors.password ? <p className="" style={{color: 'red'}}>{errors.password}</p> : <p className="" style={{color: 'rgb(28, 126, 9)'}}>Contraseña válida</p>}
              </div>

              <div className="">
                <button className="">REGISTRAR</button>
              </div>

              <h4 className="">
                ¿Ya tienes una cuenta?
                <span onClick={mostrarLoginHandler}>Iniciar sesión</span>
              </h4>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const rendrRegister = () => (
    <div>
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
              {errors.firstName ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.firstName}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Nombre válido
                </p>
              )}
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
                onChange={handleInputChange}
              />
              {errors.lastName ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.lastName}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Apellido válido
                </p>
              )}
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
                onChange={handleInputChange}
              />
              {errors.birthDate ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.birthDate}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Fecha válida
                </p>
              )}
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
                onChange={handleInputChange}
              />
              {errors.phoneNumber ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.phoneNumber}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Número válido
                </p>
              )}
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
                onChange={handleInputChange}
              />
              {errors.email ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.email}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Email válido
                </p>
              )}
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
                onChange={handleInputChange}
              />
              {errors.password ? (
                <p className={style.text} style={{ color: "red" }}>
                  {errors.password}
                </p>
              ) : (
                <p className={style.text} style={{ color: "rgb(28, 126, 9)" }}>
                  Contraseña válida
                </p>
              )}
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
    </div>
  );

  const [mostrarLogin, setMostrarLogin] = useState(false);

  return <div>{mostrarLogin ? <Login /> : rendrRegister()}</div>;

}
