/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { URL_BACKEND } from '@/config';
import { OrderProducts } from '@/Components';

export default function Profile() {
    const { data: session } = useSession();

    const defaultImage = '/profile-default.svg';
    const imageUrl = session?.user?.image || defaultImage;
    const [orders, setOrders] = useState({ count: 0, ordersWithProducts: [] });

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user.email) return;

            try {
                const response = await fetch(`${URL_BACKEND}Compras/${encodeURIComponent(session.user.email)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Error al obtener las órdenes");
                }
                const Orders = await response.json();
                setOrders(Orders);
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchData();
    }, [session?.user.email]);


    return (
        <>
            <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg mt-2">
                <div className="px-6 py-4">
                    <div className="flex justify-center rounded-lg">
                        <Image
                            className='rounded-full'
                            src={imageUrl}
                            width={96}
                            height={96}
                            alt="Descripción de la imagen"
                        />
                    </div>
                    <h1 className="text-xl font-semibold text-gray-800 text-center mt-2">
                        {session?.user?.name}
                    </h1>
                    <p className="text-center text-gray-600">{session?.user?.email}</p>

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
            <OrderProducts orders={orders} />

        </>
    );
}
