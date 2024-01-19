import React from "react";
import * as Components from "@/Components";
import Link from "next/link";


export default function LoginUp() {


  return (
    <main className="bg-gray-100 flex justify-center items-center min-h-screen px-4">
      <section className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <article className="flex flex-col">

          <h1 className="font-bold text-center pt-2 mb-4 text-xl">Bienvenido</h1>

          <form className="flex flex-col gap-6" noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Example@example.com"
                className="w-full form-input p-3 mb-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password..."
                className="form-input w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="connected"
                name="connected"
                className="form-check-input h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="connected" className="ml-2 block text-sm text-gray-900">
                Mantenerme conectado
              </label>
            </div>

            <div className="mt-4">
              <button type="submit" className="submit-button bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg w-full transition duration-150 ease-in-out">
                Iniciar Sesión
              </button>
            </div>

            <div className="mt-4 text-sm text-center">
              <span>
                ¿No tienes Cuenta? <Link href="/SignIn" className="text-green-700 hover:underline">Regístrate</Link>
              </span>

              <br />
              <span className="inline-block mt-2">
                <Link href="..." className="text-green-700 hover:underline">
                  Recuperar Contraseña
                </Link>
              </span>
            </div>
            <Components.LoginRedSocial />
          </form>
        </article>
      </section>
    </main>

  );
}