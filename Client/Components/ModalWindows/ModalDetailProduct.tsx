/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react';
import { ModalDetailProductProps } from '@/Ts/ModalWindows';
import { Product } from '@/Ts/Product';
import { URL_BACKEND } from '@/config.js';

// Función para cargar productos (ajustada para recibir ID como parámetro)
export async function loadProduct(productId: number) {
  const url = `${URL_BACKEND}Product/${productId}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export const ModalDetailProduct = ({ isOpen, onClose, productId }: ModalDetailProductProps) => {
  const [error, setError] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!productId) return; // Asegúrate de que haya un productId válido

    loadProduct(productId)
      .then(data => {
        if (!data || data.length === 0) {
          setError('No se encontró el producto.');
        } else {
          setProduct(data);
          setError('');
        }
      })
      .catch(err => {
        setError('Error al cargar el producto: ' + err.message);
      });
  }, [productId]);

  if (!isOpen) return null;

  if (!product) {
    // Renderiza un contenido alternativo cuando product es null
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
        <div className="bg-white rounded-lg shadow-xl p-5">
          <p>Cargando detalles del producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${!isOpen && 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>

        <section className="bg-white rounded-lg overflow-hidden shadow-xl m-4 max-w-xl w-full z-10">
          <header className="bg-sky-800 px-4 py-2 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
              Detalles del Producto
            </h3>
          </header>

          <div className="p-4">
            <div className="flex flex-col md:flex-row">
              <figure className="md:w-1/2">
                <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded" />
              </figure>

              <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="mt-3">
                  <p className="font-medium">ID: <span className="text-gray-700">{product.id}</span></p>
                  <p className="font-medium">Precio: <span className="text-gray-700">${product.price}</span></p>
                  <p className="font-medium">Tamaño: <span className="text-gray-700">{product.size}</span></p>
                  <p className="font-medium">Material: <span className="text-gray-700">{product.material}</span></p>
                  <p className="font-medium">Categoría: <span className="text-gray-700">{product.category}</span></p>
                </div>
              </div>
            </div>
          </div>

          <footer className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Cerrar
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}