"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ModalAlertSignIn } from '@/Components'; // Importa tu componente Modal aquí

// Definición del tipo para los datos del formulario
interface IFormInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: object;
    phoneNumber: number;
}

// Esquema de validación con Yup
const schema = yup.object({
    firstName: yup.string().required('El nombre es obligatorio'),
    lastName: yup.string().required('El apellido es obligatorio'),
    email: yup.string().email('Debe ser un email válido').required('El email es obligatorio'),
    password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
    birthDate: yup.object().required('El nombre es obligatorio'),
    phoneNumber: yup.number().required('El nombre es obligatorio'),
}).required();

export default function SignIn() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data: IFormInput) => {
        // Lógica de envío de datos del formulario
        // Ejemplo:
        console.log(data);
        handleSuccess();
        // handleError(); en caso de error
    };

    const handleSuccess = () => {
        setModalMessage("Registro exitoso!");
        setModalOpen(true);
    };

    const handleError = () => {
        setModalMessage("Hubo un error en el registro.");
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="container mx-auto p-6 flex justify-center items-center h-screen">
            <div className="w-full max-w-lg">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Regístrate</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                    {/* Campo Nombre */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 text-sm font-semibold mb-2">
                            Nombre
                        </label>
                        <input {...register('firstName')} id="firstName" type="text" placeholder="Tu Nombre" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        <p className="text-red-500 text-xs italic">{errors.firstName?.message}</p>
                    </div>

                    {/* Campo Apellido */}
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 text-sm font-semibold mb-2">
                            Apellido
                        </label>
                        <input {...register('lastName')} id="lastName" type="text" placeholder="Tu Apellido" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        <p className="text-red-500 text-xs italic">{errors.lastName?.message}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="birthDate" className="block text-gray-700 text-sm font-semibold mb-2">
                                Fecha de Nacimiento
                            </label>
                            <input {...register('birthDate')} id="birthDate" type="date" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-semibold mb-2">
                                Número de Teléfono
                            </label>
                            <input {...register('phoneNumber')} id="phoneNumber" type="tel" placeholder="Tu Teléfono" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            <p className="text-red-500 text-xs italic">{errors.phoneNumber?.message}</p>
                        </div>
                    </div>

                    {/* Campos Email y Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input {...register('email')} id="email" type="email" placeholder="Tu Email" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <input {...register('password')} id="password" type="password" placeholder="Tu Contraseña" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" />
                            <p className="text-red-500 text-xs italic">{errors.password?.message}</p>
                        </div>
                    </div>

                    {/* Botones y Link */}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
                            REGISTRARSE
                        </button>
                        <Link href="/LoginUp" className="inline-block align-baseline font-semibold text-sm text-blue-600 hover:text-blue-800 transition duration-300">
                            ¿Ya tienes una cuenta? Iniciar sesión
                        </Link>
                    </div>
                </form>
            </div>
            <ModalAlertSignIn isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
        </section>

    );
};
