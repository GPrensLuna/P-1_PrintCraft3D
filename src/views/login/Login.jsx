import axios from "axios";
import React, { useState } from "react";
import style from "./Login.module.css";
import { URL } from "../../config.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    try {
      if (isRegistering) {
        // Captura los valores ingresados por el usuario al registrarse
        setFormData({
          ...formData,
          [name]: value,
        });

        // Enviar datos de registro al servidor
        const response = await axios.post(`${URL}Registro`, formData);

        if (response.status === 201) {
          alert("Registro exitoso");
        } else {
          alert("Hubo un error en el registro");
        }
      } else {
        alert("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("Hubo un error al iniciar sesión o registrarse");
    }
  };

  return (
    <Form className="w-100">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    // <div className={style.formBackground}>
    //   <div
    //     className={
    //       isRegistering ? style.formContainerRegister : style.formContainer
    //     }
    //   >
    //     <form className={style.loginForm} onSubmit={handleFormSubmit}>
    //       <h2 className={style.loginF}>
    //         {isRegistering ? "REGISTRO" : "LOGIN"}
    //       </h2>

    //       {isRegistering && (
    //         <div className={style.logiConten}>
    //           <label htmlFor="firstName" className={style.formLabel}>
    //             Nombre
    //           </label>
    //           <input
    //             type="text"
    //             id="firstName"
    //             name="firstName"
    //             className={style.formInput}
    //             required
    //             value={formData.firstName}
    //             onChange={(e) =>
    //               setFormData({ ...formData, firstName: e.target.value })
    //             }
    //           />
    //         </div>
    //       )}

    //       {isRegistering && (
    //         <div className={style.logiConten}>
    //           <label htmlFor="lastName" className={style.formLabel}>
    //             Apellido
    //           </label>
    //           <input
    //             type="text"
    //             id="lastName"
    //             name="lastName"
    //             className={style.formInput}
    //             required
    //             value={formData.lastName}
    //             onChange={(e) =>
    //               setFormData({ ...formData, lastName: e.target.value })
    //             }
    //           />
    //         </div>
    //       )}

    //       {isRegistering && (
    //         <div className={style.logiConten}>
    //           <label htmlFor="birthDate" className={style.formLabel}>
    //             Fecha de Nacimiento
    //           </label>
    //           <input
    //             type="date"
    //             id="birthDate"
    //             name="birthDate"
    //             className={style.formInput}
    //             required
    //             value={formData.birthDate}
    //             onChange={(e) =>
    //               setFormData({ ...formData, birthDate: e.target.value })
    //             }
    //           />
    //         </div>
    //       )}

    //       {isRegistering && (
    //         <div className={style.logiConten}>
    //           <label htmlFor="phoneNumber" className={style.formLabel}>
    //             Número de Teléfono
    //           </label>
    //           <input
    //             type="tel"
    //             id="phoneNumber"
    //             name="phoneNumber"
    //             className={style.formInput}
    //             required
    //             value={formData.phoneNumber}
    //             onChange={(e) =>
    //               setFormData({ ...formData, phoneNumber: e.target.value })
    //             }
    //           />
    //         </div>
    //       )}

    //       <div className={style.logiConten}>
    //         <label htmlFor="email" className={style.formLabel}>
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           name="email"
    //           className={style.formInput}
    //           required
    //           value={formData.email}
    //           onChange={(e) =>
    //             setFormData({ ...formData, email: e.target.value })
    //           }
    //         />
    //       </div>

    //       <div className={style.logiConten}>
    //         <label htmlFor="password" className={style.formLabel}>
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           name="password"
    //           className={style.formInput}
    //           required
    //           value={formData.password}
    //           onChange={(e) =>
    //             setFormData({ ...formData, password: e.target.value })
    //           }
    //         />
    //       </div>

    //       <div className={style.submitButtonConten}>
    //         <button className={style.submitButton}>
    //           {isRegistering ? "REGISTRAR" : "INICIAR"}
    //         </button>
    //       </div>

    //       <h4 className={style.subButton}>
    //         {isRegistering
    //           ? "¿Ya tienes una cuenta?"
    //           : "¿Aún no te has registrado?"}{" "}
    //         <span onClick={() => setIsRegistering(!isRegistering)}>
    //           {isRegistering ? "Iniciar sesión" : "Regístrate"}
    //         </span>
    //       </h4>
    //     </form>
    //   </div>
    // </div>
  );
}
