/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import { URL_BACKEND } from '@/config';
import { OrdersProps, Product } from '@/Ts/Product';
import { ReviewForm } from '@/Components'

const fetchProductData = async (productId: number) => {
    const response = await fetch(`${URL_BACKEND}Product/${productId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const OrderProducts = ({ orders }: OrdersProps) => {
    const [productsData, setProductsData] = useState<{ [key: number]: Product }>({});

    useEffect(() => {
        orders.ordersWithProducts.forEach((orderWithProducts) => {
            orderWithProducts.productIds.forEach(async (productId) => {
                if (!productsData[productId]) {
                    try {
                        const productData = await fetchProductData(productId);
                        setProductsData((prevProductsData) => ({
                            ...prevProductsData,
                            [productId]: productData,
                        }));
                    } catch (error) {
                        console.error('Failed to fetch product data:', error);
                    }
                }
            });
        });
    }, [orders]);


    function formatCurrency(value: number) {
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
    }

    /*   const fetchProductReviews = async (productId: number) => {
          try {
              const response = await fetch(`${URL_BACKEND}Reviews/${productId}`);
  
              if (!response.ok) {
                  throw new Error(`Error al obtener las reseñas: ${response.statusText}`);
              }
  
              return await response.json();
          } catch (error) {
              console.error('Falló la solicitud de obtener reseñas:', error);
              throw error; // Lanza el error para manejo externo si es necesario
          }
      }; */


    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Total de órdenes: {orders.count}</h1>
            {orders.ordersWithProducts.map((orderWithProducts, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700">Orden ID: {orderWithProducts.order.id} - Total: {formatCurrency(orderWithProducts.order.total)}</h2>
                    <div className="mt-4">
                        {orderWithProducts.productIds.map((productId, index) => {
                            const product = productsData[productId];
                            return (
                                <div key={index} className="flex items-center border-b border-gray-200 last:border-0 py-4">
                                    {product ? (
                                        <>
                                            <div className="w-20 h-20 mr-4">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-md font-medium text-gray-900">{product.name}</h3>
                                                <h3 className="text-md text-indigo-600">{formatCurrency(product.price)}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                                {/*   <button className="mt-2 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                                    Revisar
                                                </button> */}
                                                {/*    {product && (
                                                    <ReviewForm productId={productId} />
                                                )} */}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500">Cargando datos del producto...</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}

        </div>
    );
};