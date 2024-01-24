/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { URL_BACKEND } from "@/config";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from 'react-redux';
import { setProfile } from '@/redux/features/profileSlice';

interface Perfil {
    name?: string;
    email?: string;
}

export default function Profile() {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [perfil, setPerfil] = useState<Perfil>({});
    const [cargaPerfil, setCargaPerfil] = useState(false);

    useEffect(() => {
        const obtenerDatosPerfil = async () => {
            if (session) {
                setCargaPerfil(true); // Inicia la carga del perfil
                try {
                    const token = session?.user?.token;
                    const res = await fetch(`${URL_BACKEND}/Profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    const datosPerfil = await res.json();
                    setPerfil(datosPerfil);
                    dispatch(setProfile(datosPerfil))
                } catch (error) {
                    console.error('Error al obtener los datos del perfil:', error);
                } finally {
                    setCargaPerfil(false);
                }
            }
        };
        obtenerDatosPerfil();
    }, [dispatch, session]);

    if (status === "loading" || cargaPerfil) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg mt-2">
            <div className="px-6 py-4">
                <div className="flex justify-center">
                    <img className="object-cover w-32 h-32 rounded-full border-2 border-indigo-500" src="https://via.placeholder.com/150" alt="Profile" />
                </div>
                <h1 className="text-xl font-semibold text-gray-800 text-center mt-2">
                    {perfil.name}
                </h1>
                <p className="text-center text-gray-600">{perfil.email}</p>

                <div className="flex items-center mt-4 text-gray-700">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
                        <path d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
                    </svg>
                    <h1 className="px-2 text-sm">ciudad@example.com</h1>
                </div>

                <div className="flex items-center mt-4 text-gray-700">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
                        <path d="M3 7v10c0 1.1.9 2 2 2h15a2 2 0 002-2V7"></path>
                        <polyline points="16 3 12 7 8 3"></polyline>
                    </svg>
                    <h1 className="px-2 text-sm">www.ejemplo.com</h1>
                </div>

                <div className="flex justify-around mt-6">
                    <span className="block px-4 py-1 text-sm text-gray-700 bg-gray-200 rounded">HTML</span>
                    <span className="block px-4 py-1 text-sm text-gray-700 bg-gray-200 rounded">CSS</span>
                    <span className="block px-4 py-1 text-sm text-gray-700 bg-gray-200 rounded">JavaScript</span>
                </div>
            </div>
        </div>
    );
}
