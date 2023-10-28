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
      const response = await fetch(`${URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Usa response.json() para obtener el cuerpo de la respuesta como objeto JSON
        const responseData = await response.json();

        // Verifica si el token está presente en la respuesta
        const token = responseData.token;

        if (!token) {
          console.error(
            "El token no está presente en la respuesta del servidor"
          );
          alert("Inicio de sesión fallido");
        } else {
          // Almacena el token en el almacenamiento local
          localStorage.setItem("token", token);

          // Accede al token almacenado y decódificalo

          // Redirige a la página principal u otra página deseada
          window.location.href = "/";
        }
      } else {
        // Maneja la respuesta en caso de un error (puede ser un error de red o un error en el servidor)
        const errorData = await response.json();
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

// import React, { useState } from "react";
// import style from "./Login.module.css";
// import Register from "./Register.jsx";
// import { URL } from "../../config.js";
// //import jwt from "jsonwebtoken";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [mostrarRegistro, setMostrarRegistro] = useState(false);
//   //const [userName, setUserName] = useState("");

//   //console.log("user", userName);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${URL}login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         const token = responseData.token;

//         //const decodedToken = jwt.decode(token);

//         // Extrae el nombre del usuario del token y almacénalo en el estado
//         // const userFullName = decodedToken.name;
//         //setUserName(userFullName);

//         localStorage.setItem("token", token);
//         window.location.href = "/";
//       } else {
//         const errorData = await response.json();
//         console.error("Error en la respuesta:", errorData);
//         alert("Inicio de sesión fallido");
//       }
//     } catch (error) {
//       console.error("Error durante el inicio de sesión:", error);
//       alert("Se produjo un error durante el inicio de sesión");
//     }
//   };
//   const mostrarRegistroHandler = () => {
//     setMostrarRegistro(!mostrarRegistro);
//   };

//   return (
//     <div>
//       {mostrarRegistro ? (
//         <Register />
//       ) : (
//         <div className={style.formBackground}>
//           <div className={style.formContainer}>
//             <form className={style.loginForm} onSubmit={handleFormSubmit}>
//               <h2 className={style.loginF}>LOGIN</h2>

//               {/* Email input */}
//               <div className={style.logiConten}>
//                 <label htmlFor="email" className={style.formLabel}>
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className={style.formInput}
//                   required
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>

//               {/* Password input */}
//               <div className={style.logiConten}>
//                 <label htmlFor="password" className={style.formLabel}>
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className={style.formInput}
//                   required
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//               </div>

//               {/* Submit button */}
//               <div className={style.submitButtonConten}>
//                 <button type="submit" className={style.submitButton}>
//                   INICIAR
//                 </button>
//               </div>

//               {/* Registration link */}
//               <h4 className={style.subButton}>
//                 ¿Aún no te has registrado?
//                 <span
//                   onClick={mostrarRegistroHandler}
//                   className={style.registerLink}
//                 >
//                   {" "}
//                   Regístrate
//                 </span>
//               </h4>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
