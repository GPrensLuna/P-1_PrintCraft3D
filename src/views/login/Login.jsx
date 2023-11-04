import logo from "../../imagenes/logo.png";
import LoginRedSocial from "../../Components/LoginRedSocial/LoginRedSocial.jsx";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

// import Register from "./Register.jsx";
// import { URL } from "../../config.js";

const validate = (values) => {
  const errors = {};

  // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

  // if(values.password.match(regex)){
  //   errors.password = "Password valido"
  // } else {
  //   errors.password = "La contraseña es valida"
  // }

  if (!values.email) {
    errors.email = "Email requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email invalido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  } 

  return errors;
};

export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
              <button className="btn btn-outline-primary">
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
              </button>
            </Link>

            <h2 className="fw -bold text-center pt-1 mb-2">Bienvenido</h2>
            {/* Label Email*/}
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
            {/*Label Password */}
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
              <label for="connected" className="form-check-label">
                Mantenerme conectado
              </label>
            </div>
            {/* Boton Iniciar Sesion*/}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Iniciar Sesion
              </button>
            </div>
            <div className="my-3">
              <span>
                ¿No tienes Cuenta?{" "}
                <span className="">
                  {" "}
                  {/*onClick={mostrarRegistroHandler} */}{" "}
                  <Link to="/Register">Registrate </Link>
                </span>
              </span>

              <br />
              <Link>
                <span className="pe-auto" aria-disabled="true">
                  Recuperar Password
                </span>
              </Link>
            </div>
            {/* Login con redes sociales */}
            <LoginRedSocial />
          </form>
        </div>
      </div>

      {/* )
      } */}
    </div>
  );
}
