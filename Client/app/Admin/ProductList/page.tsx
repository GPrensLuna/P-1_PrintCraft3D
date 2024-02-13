/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from "react";
import { Product } from "@/Ts/Product";
import { ProductsRow, ModalEditProducts, AddProductButton } from '@/Components';
import { fetchProducts, updateProduct } from '@/redux/services/ProductService';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    const openModal = (productId: number) => {
        const product = products.find(p => p.id === productId);
        setCurrentProduct(product ?? null);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentProduct(null);
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error: any) {
                setError("Error al cargar los productos");
                console.error("Error al cargar productos:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleSaveEdit = async (updatedProduct: Product) => {
        try {
            await updateProduct(updatedProduct.id, updatedProduct);
            setProducts(prevProducts =>
                prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
            );
            closeModal();
        } catch (error: any) {
            setError("Error al actualizar el producto");
            console.error("Error al guardar cambios:", error);
        }
    };


    if (loading) {
        return <p className="text-gray-600">Cargando información de productos...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    const thClasses = "py-3 text-sm text-center font-semibold text-gray-800";

    return (
        <main className="flex justify-center w-full py-10">
            <div className="container w-full max-w-7xl flex flex-col">
                <h2 className="text-2xl text-center font-bold mb-8">Lista de Productos</h2>
                <AddProductButton />
                <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                    <thead>
                        <tr className="text-left bg-gray-100">
                            <th className={thClasses}>ID</th>
                            <th className={thClasses}>Imagen</th>
                            <th className={thClasses}>Nombre</th>
                            <th className={thClasses}>Descripción</th>
                            <th className={thClasses}>Precio</th>
                            <th className={thClasses}>Stock</th>
                            <th className={thClasses}>Tamaño</th>
                            <th className={thClasses}>Material</th>
                            <th className={thClasses}>Categoría</th>
                            <th className={thClasses}>Deleted</th>
                            <th className={thClasses}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product: Product) => (
                            <ProductsRow
                                key={product.id}
                                product={product}
                                openModal={openModal}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {currentProduct && (
                <ModalEditProducts
                    editingProduct={currentProduct}
                    show={showModal}
                    onClose={closeModal}
                    handleSaveEdit={handleSaveEdit}
                />
            )}
        </main>
    );
};