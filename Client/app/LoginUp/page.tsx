"use client";

import { useState, FormEvent } from "react";
import * as Components from "@/Components";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';



export default function LoginUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (result?.error) {
      setModalMessage("No se a podido iniciar la secion con exíto verifique el email o password");
      setIsModalOpen(true);
    } else {
      //window.location.href = '/Profile'
      setTimeout(() => {
        router.push('/Profile');
      }, 5000);
    }
  };


  return (
    <main className="bg-gray-100 flex justify-center items-center min-h-screen px-4">
      <section className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <article className="flex flex-col">

          <h1 className="font-bold text-center pt-2 mb-4 text-xl">Bienvenido</h1>
          <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Example@example.com"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="form-input w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit" className="submit-button bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg w-full transition duration-150 ease-in-out">
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
      <Components.Modalwarning
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </main>

  );
}