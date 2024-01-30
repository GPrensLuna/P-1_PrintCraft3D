/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState, useEffect } from "react";
import { Product } from "@/Ts/Product";
import * as Components from '@/Components'

export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [showClearCartModal, setShowClearCartModal] = useState(false);
    const [productToRemove, setProductToRemove] = useState<number | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showEmptyCartWarning, setShowEmptyCartWarning] = useState(false);


    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const handleUpProduct = (productId: number) => {
        const newCartItems = cartItems.map((item) => {
            if (item.id === productId) {
                return { ...item, count: (item.count ?? 0) + 1 };
            }
            return item;
        });
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
    };
    const handleDownProduct = (productId: number) => {
        const newCartItems = cartItems.map((item) => {
            if (item.id === productId && (item.count ?? 0) > 1) {
                return { ...item, count: (item.count ?? 0) - 1 };
            }
            return item;
        });
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handleRemoveProduct = (productId: number) => {
        setProductToRemove(productId);
    };

    const handleConfirmClearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cart");
        setShowClearCartModal(false);
    };

    const handleConfirmRemoveProduct = () => {
        if (productToRemove !== null) {
            const newCartItems = cartItems.filter((item) => item.id !== productToRemove);
            setCartItems(newCartItems);
            localStorage.setItem("cart", JSON.stringify(newCartItems));
            setProductToRemove(null);
        }
    };

    const handlePaymentClick = () => {
        if (cartItems.length === 0) {
            setShowEmptyCartWarning(true);
        } else {
            setShowPaymentModal(true);
            console.log('Modal should show now');
        }
    };

    const handleRemoveAllProducts = () => {
        if (cartItems.length === 0) {
            setShowEmptyCartWarning(true);
        } else {
            setShowClearCartModal(true);
        }
    };


    return (
        <section className="grid-products bg-white shadow rounded-lg max-w-7xl mx-auto mt-10 grid-Shopping gap-4 p-6">
            {/* Encabezado del Carrito */}
            <header className="col-span-3 border-b border-gray-200 p-6">
                <h1 className="text-2xl font-semibold text-gray-900 text-aling">
                    Carrito de compras
                </h1>
            </header>

            <article className="col-span-2">
                {/* Contenido del Carrito */}
                {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                        {/* Mensaje Carrito Vacío */}
                        <p className="text-gray-600">Tu carrito está vacío</p>
                    </div>
                ) : (
                    <article>
                        {/* Lista de Productos */}
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item: Product) => (
                                <li
                                    key={item.id}
                                    className="flex items-center p-6 hover:bg-gray-50"
                                >
                                    <button
                                        onClick={() => handleRemoveProduct(item.id)}
                                        className="flex items-center justify-center bg-slate-400 hover:bg-red-600 text-gray-100 hover:text-gray-300 font-semibold py-2 px-4 rounded"
                                    >
                                        <span>X</span>
                                    </button>

                                    {/* Imagen del Producto */}
                                    <div className="pr-5 pl-3">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-16 w-16 rounded object-cover mr-6"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        {/* Nombre y Descripción del Producto */}
                                        <h2 className="text-lg font-medium text-gray-900">
                                            {item.name}
                                        </h2>
                                        <p className="text-sm text-gray-600">{item.description}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        {/* Precio y Controles de Cantidad */}
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatCurrency(item.price)}
                                        </p>
                                        <div className="flex items-center mt-4">
                                            {/* Botones para modificar la cantidad */}
                                            <button
                                                onClick={() => handleDownProduct(item.id)}
                                                className="flex items-center justify-center bg-white hover:bg-red-600 text-gray-500 hover:text-gray-700 p-2 rounded"
                                            >
                                                <svg
                                                    className="h-5 w-5 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 10a1 1 0 001 1h8a1 1 0 100-2H6a1 1 0 00-1 1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                            <span className="text-gray-700 mx-2">{item.count}</span>

                                            <button
                                                onClick={() => handleUpProduct(item.id)}
                                                className="flex items-center justify-center bg-white hover:bg-cyan-500 text-gray-500 hover:text-gray-700 p-2 rounded"
                                            >
                                                <svg
                                                    className="h-5 w-5 fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {item.size}, {item.material}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </article>
                )}
            </article>

            <footer className="col-start-3 border-t border-gray-200 p-6">
                <div className="flex flex-col">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between mb-2 items-center"
                        >
                            <span className="flex-1">{item.name}</span>
                            <span className="flex-1 text-center">
                                {item.count ?? 0} x {formatCurrency(item.price)}
                            </span>
                            <span className="flex-1 text-right">
                                = {formatCurrency((item.count ?? 0) * item.price)}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between mt-4">
                        <span className="text-gray-600">
                            Total (
                            {cartItems.reduce((total, item) => total + (item.count ?? 0), 0)}{" "}
                            Productos)
                        </span>
                        <span className="text-xl font-semibold text-gray-900">
                            {formatCurrency(
                                cartItems.reduce((total, item) => total + item.price * (item.count ?? 0), 0)
                            )}
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleRemoveAllProducts}
                        className="text-sm border  border-gray-300 py-2 px-4 rounded-md hover:bg-red-400 mr-4"
                    >
                        Vaciar carrito
                    </button>
                    <button
                        onClick={handlePaymentClick}
                        className="text-sm w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                        Ir a pagar
                    </button>
                </div>
            </footer>

            {productToRemove !== null && (
                <Components.ModalAlert
                    title="Eliminar Producto"
                    message="¿Estás seguro de que deseas eliminar este producto del carrito?"
                    onConfirm={handleConfirmRemoveProduct}
                    onCancel={() => setProductToRemove(null)}
                />
            )}

            {showClearCartModal && (
                <Components.ModalAlert
                    title="Vaciar Carrito"
                    message="¿Estás seguro de que deseas vaciar todo el carrito de compras?"
                    onConfirm={handleConfirmClearCart}
                    onCancel={() => setShowClearCartModal(false)}
                />
            )}

            {showPaymentModal && (
                <Components.ModalShowPayment
                    title="Pago"
                    total={cartItems.reduce((total, item) => total + item.price * (item.count ?? 0), 0)}
                    cartItems={cartItems}
                    onConfirm={() => setShowPaymentModal(false)}
                    onCancel={() => setShowPaymentModal(false)}
                />
            )}

            {showEmptyCartWarning && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <div className="bg-white rounded-lg p-8 max-w-sm shadow-md">
                        <p className="text-lg font-semibold text-gray-800 mb-4">
                            Tu carrito está vacío
                        </p>
                        <button
                            onClick={() => {
                                setShowEmptyCartWarning(false);
                                window.location.href = "/";
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring focus:ring-red-300 mr-2">
                            Ir a comprar
                        </button>
                        <button
                            onClick={() => setShowEmptyCartWarning(false)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

        </section>
    );
}