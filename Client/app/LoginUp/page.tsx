"use client";

import { useState, FormEvent } from "react";
import * as Components from "@/Components";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

interface CopyButtonProps {
  copyContent: string;
}

export default function LoginUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  console.log("email", email)
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
      router.push('/Profile');
    }
  };

  const CopyButton: React.FC<CopyButtonProps> = ({ copyContent }) => {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(copyContent).then(() => {
      }, (err) => {
        console.error('Error al copiar: ', err);
      });
    };

    return (
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
      >
        Copiar
      </button>
    );
  };

  return (
    <main className="bg-gray-100 flex justify-center items-center min-h-screen px-4">
      <div className="left-20 bg-sky-500 rounded-lg w-56 h-80 p-4">
        <h1>NOTA:</h1>
        <div className="flex flex-col items-center gap-2">
          <span>Client</span>
          <div className="flex gap-2 items-center">
            <h2>User: test@test.com</h2>
            <CopyButton copyContent="test@test.com" />
          </div>
          <div className="flex gap-2 items-center">
            <h2>Pass: 123456</h2>
            <CopyButton copyContent="123456" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <span>Admin</span>
          <div className="flex gap-2 items-center">
            <h2>User: Admin@Admin.com</h2>
            <CopyButton copyContent="Admin@Admin.com" />
          </div>
          <div className="flex gap-2 items-center">
            <h2>Pass: admins</h2>
            <CopyButton copyContent="admins" />
          </div>
        </div>
      </div>

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