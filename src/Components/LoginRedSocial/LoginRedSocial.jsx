import React from "react";
import google from "../../imagenes/google.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { auth, database } from "../../firebase.js";

const LoginRedSocial = () => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Google Auth Result:", result);

      const userRef = ref(database, 'usuarios/' + result.user.uid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        set(userRef, {
          email: result.user.email,
        });
      }
    } catch (error) {
      console.error("Error durante la autenticación con Google:", error);
    }
  };

  return (
    <div className="container w-100 my-4">
      <div className="row text-center">
        <div className="col-12">Iniciar Sesión</div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-outline-danger w-100 my-1" onClick={handleGoogleSignIn}>
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