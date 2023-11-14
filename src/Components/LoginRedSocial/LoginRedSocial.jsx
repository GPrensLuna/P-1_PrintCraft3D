import React from "react";
import google from "../../imagenes/google.png";
import axios from "axios";
import { URL } from '../../config.js';
import { GoogleAuthProvider, signInWithPopup, auth } from "../../firebase.js";

const LoginRedSocial = () => {

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Información del usuario autenticado con Google:", user);
  
      const response = await axios.post(`${URL}Google`, {
        firstName: user.displayName,
        email: user.email,
        roll: "Client",
      });
  
      const receivedToken = response.data.token;
      localStorage.setItem("token", receivedToken);
      window.location.href = "/Profile";
    } catch (error) {
      console.error("Error al autenticar con Google:", error.message);
      console.error("Detalles del error:", error.response);
    }
  };

  return (
    <div className="container w-100 my-4">
      <div className="row text-center">
        <div className="col-12">Iniciar Sesión</div>
      </div>
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-danger w-100 my-1"
            onClick={handleGoogleSignIn}
          >
            <div className="row align-items-center">
              <div className="col-2">
                <img src={google} alt="Google" width="32" className="" />
              </div>
              <div className="col-10 text-center">Google</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRedSocial;
