"use client"
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, auth } from '@/firebase.js';
import { setLoginUser } from '@/redux/features/LogInSlice';
import google from '@/img/google.webp';
import { URL_BACKEND } from '@/config';

export const LoginRedSocial = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [userRegistered, setUserRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await fetch(`${URL_BACKEND}/Google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: user.displayName,
          email: user.email,
          roll: "Client",
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const responseData = await response.json();

      const receivedToken = responseData.token;
      const id = responseData.id;

      localStorage.setItem('token', receivedToken);
      localStorage.setItem('userData', JSON.stringify({
        firstName: user.displayName,
        email: user.email,
        roll: "Client",
        userId: id,
      }));

      setUserRegistered(true);
      dispatch(setLoginUser({
        firstName: user.displayName,
        email: user.email,
        roll: "Client",
      }));
      setUserData({
        ...userData,
        userId: id,
      });

      if (id) {
        createCart(id);
      }

      router.push('/Profile');  // Redirección usando Next.js router
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const createCart = async (userId: number) => {
    try {
      const response = await fetch(`${URL_BACKEND}/shoppingCart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Respuesta de la creación del carrito:', responseData);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
    }
  };

  return (
    <div className="container w-100 my-4">
      <div className="row">
        <div className="col">
          <button onClick={handleGoogleSignIn} type="button" className="btn btn-outline-danger w-100 my-1" disabled={userRegistered}>
            <div className="row align-items-center">
              <div className="col-2">
                <Image src={google} alt="Google" width="32" />
              </div>
              <div className="col-10 text-center">Iniciar sesión con Google</div>
            </div>
          </button>
        </div>
      </div>

      {loading && (
        <div className="row text-center mt-2">
          <div className="col-12">Cargando...</div>
        </div>
      )}
    </div>
  );
};
