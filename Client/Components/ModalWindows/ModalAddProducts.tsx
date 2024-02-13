/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from "react";
import { URL_BACKEND, URL_CLOUDINARY } from "@/config.js";

interface ModalAddProductsProps {
    showModal: boolean;
    onClose: () => void;
}
export const ModalAddProducts = ({ showModal, onClose }: ModalAddProductsProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageSelected, setImageSelected] = useState<File | null>(null);
    console.log("imageSelected", imageSelected)
    const [producto, setProducto] = useState({
        name: "",
        description: "",
        size: "",
        price: "",
        stock: "",
        material: "",
        category: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProducto((prevProducto) => ({ ...prevProducto, [name]: value }));
    };

    const uploadImage = async () => {
        try {
            if (!imageSelected) return;

            const formData = new FormData();
            formData.append("file", imageSelected);
            formData.append("upload_preset", "PrintCraft3DImagenes");

            const response = await fetch(`${URL_CLOUDINARY}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Error al subir la imagen a Cloudinary");
            }

            const data = await response.json();
            console.log("data", data)
            setImagePreview(data.secure_url);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await uploadImage();

            const response = await fetch(`${URL_BACKEND}Inventario`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...producto,
                    image: imagePreview,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al agregar producto");
            }

            setProducto({
                name: "",
                description: "",
                size: "",
                price: "",
                stock: "",
                material: "",
                category: "",
            });

            onClose();
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <div className={`${showModal ? 'block' : 'hidden'} fixed inset-0 overflow-y-auto`}>

            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-opacity-75 bg-gray-500"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-8 py-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Registrar Producto</h2>
                    <button onClick={() => onClose()} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                        Cerrar
                    </button>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={producto.name}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen:</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={(e) => setImageSelected(e.target.files ? e.target.files[0] : null)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <button type="button" onClick={uploadImage} className="mt-2 inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Guardar foto</button>

                            {imagePreview && (
                                <div className="mt-4">
                                    <img src={imagePreview} alt="Preview" className="h-40 object-cover" />
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={producto.description}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="size" className="block text-sm font-medium text-gray-700">Tamaño:</label>
                            <select
                                id="size"
                                name="size"
                                value={producto.size}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Selecciona un tamaño</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material:</label>
                            <select
                                id="material"
                                name="material"
                                value={producto.material}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Selecciona un material</option>
                                <option value="ABS">ABS</option>
                                <option value="TPU">TPU</option>
                                <option value="PLA">PLA</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría:</label>
                            <select
                                id="category"
                                name="category"
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="accesorio">Accesorio</option>
                                <option value="figura">Figura</option>
                                <option value="decoracion">Decoración</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={producto.price}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={producto.stock}
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Agregar Producto
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
