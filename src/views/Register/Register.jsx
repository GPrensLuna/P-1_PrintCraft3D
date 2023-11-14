import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "../../config.js";
import Login from "../login/Login";
import './style.css';
import Swal from 'sweetalert2';

const mostrarLoginState = false;

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    roll: "Client",
  };
  

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Nombre es requerido"),
    lastName: Yup.string().required("Apellido es requerido"),
    birthDate: Yup.string().required("Fecha de Nacimiento es requerida"),
    phoneNumber: Yup.string().required("Número de Teléfono es requerido"),
    email: Yup.string().email("Email inválido").required("Email es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Contraseña es requerida"),
  });

  const [mostrarLogin, setMostrarLogin] = useState(mostrarLoginState);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${URL}Registro`, values);
  
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error en el registro',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    setSubmitting(false);
  };

  const mostrarLoginHandler = () => {
    setMostrarLogin(true);
  };

  return (
    <div className="register-container">
      <div className="row g-2">
        <div>
          {mostrarLogin ? (
            <Login />
          ) : (
            <div className="form_container">
              <h2 className="text-center">REGISTRO</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-control"
                          required
                        />
                        <label htmlFor="firstName" className="form-label">Nombre</label>
                      </div>
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-control"
                          required
                        />
                        <label htmlFor="lastName" className="form-label">Apellido</label>
                      </div>
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="date"
                          id="birthDate"
                          name="birthDate"
                          className="form-control"
                          required
                        />
                        <label htmlFor="birthDate" className="form-label">Fecha de Nacimiento</label>
                      </div>
                      <ErrorMessage
                        name="birthDate"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          className="form-control"
                          required
                        />
                        <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
                      </div>
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          required
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <div className="form-floating">
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn button">
                    REGISTRAR
                  </button>
                  <div className="form-group">
                    <h4>
                      ¿Ya tienes una cuenta?
                      <span onClick={mostrarLoginHandler}>Iniciar sesión</span>
                    </h4>
                  </div>
                </Form>
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
