"use client"
import Image from 'next/image';
import google from '@/img/google.webp';
//import { URL_BACKEND } from '@/config';
import { signIn } from "next-auth/react";

export const LoginRedSocial = () => {
  return (
    <div className="container w-100 my-4">
      <div className="row">
        <div className="col">
          <button onClick={() => signIn('google')} type="button" className="btn btn-outline-danger w-100 my-1"
          >
            <div className="row align-items-center">
              <div className="col-2">
                <Image src={google} alt="Google" width="32" />
              </div>
              <div className="col-10 text-center">Iniciar sesión con Google</div>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
