"use client"
import { useState } from "react";
import google from "@/img/google.webp";
import Image from "next/image";

export const LoginRedSocial = () => {
  const [userRegistered, setUserRegistered] = useState(false);

  return (
    <div className="container w-100 my-4">

      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-danger w-100 my-1"
            disabled={userRegistered}
          >
            <div className="row align-items-center">
              <div className="col-2">
                <Image src={google} alt="Google" width="32" className="" />
              </div>
              <div className="col-10 text-center">Google</div>
            </div>
          </button>
        </div>
      </div>

      {userRegistered && "userData" && (
        <div className="row text-center mt-2">
          <div className="col-12"></div>
        </div>
      )}
    </div>
  );
};
