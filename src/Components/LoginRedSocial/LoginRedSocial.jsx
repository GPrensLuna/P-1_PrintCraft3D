import React from "react";
import fb from "../../imagenes/fb.png"
import google from "../../imagenes/google.png"


const LoginRedSocial = () => {
  return (
    <div className="container w-100 my-4">
      <div className="row text-center">
        <div className="col-12">Iniciar Sesion</div>
      </div>
      <div className="row">
        <div className="col">
            <button className="btn btn-outline-primary w-100 my-1">
                <div className="row align-items-center">
                    <div className="col-2">
                        <img src={fb} alt="Facebook" width="32" className=""/>
                    </div>
                    <div className="col-10 text-center">
                        Facebook
                    </div>
                </div>
            </button>
        </div>

        <div className="col">
        <button className="btn btn-outline-danger w-100 my-1">
                <div className="row align-items-center">
                    <div className="col-2">
                        <img src={google} alt="Google" width="32" className=""/>
                    </div>
                    <div className="col-10 text-center">
                        Google
                    </div>
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRedSocial;
