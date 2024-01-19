"use client"
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Product, ModalEditProductsProps, InputFieldProps, Field } from "@/Ts/Product";
import { ModalAlert } from '@/Components'


const InputField = ({ label, name, value, onChange, placeholder, type = "text", options }: InputFieldProps) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        {options ? (
            <select
                name={name}
                value={value.toString()}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
                {options.map((option) => (
                    <option key={option.toString()} value={option.toString()}>
                        {option.toString()}
                    </option>
                ))}
            </select>
        ) : (
            <input
                type={type}
                name={name}
                value={value.toString()}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
        )}
    </div>
);

export const ModalEditProducts = ({ editingProduct, show, onClose, handleSaveEdit }: ModalEditProductsProps) => {
    const [product, setProduct] = useState<Product>(editingProduct);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [actionType, setActionType] = useState<'save' | 'close' | ''>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === 'deleted' ? value === 'true' : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSaveEdit(product);
    };

    const deleteOptions = [
        "true",
        "false",
    ];

    const fields: Field[] = [
        { label: "Imagen", name: "image", placeholder: "URL de la imagen", type: "text", valueType: "string" },
        { label: "Nombre", name: "name", placeholder: "Nombre del Producto", type: "text", valueType: "string" },
        { label: "Descripción", name: "description", placeholder: "Descripción del Producto", type: "text", valueType: "string" },
        { label: "Precio", name: "price", placeholder: "Precio", type: "number", valueType: "number" },
        { label: "Stock", name: "stock", placeholder: "Stock", type: "number", valueType: "number" },
        { label: "Material", name: "material", placeholder: "Material", type: "text", valueType: "string", options: materials },
        { label: "Tamaño", name: "size", placeholder: "Tamaño", type: "text", valueType: "string", options: sizes },
        { label: "Categoría", name: "category", placeholder: "Categoría", type: "text", valueType: "string", options: categorys },
        { label: "Eliminado", name: "deleted", placeholder: "Eliminado", type: "text", valueType: "boolean", options: deleteOptions },
    ];

    const getValue = (field: Field) => {
        const value = product[field.name];

        if (field.valueType === "boolean") {
            return value ? 'true' : 'false';
        }

        if (value === undefined || (typeof value !== "string" && typeof value !== "number")) {
            return field.valueType === "number" ? "0" : "";
        }

        if (field.valueType === "number") {
            return value.toString();
        }

        return value as string;
    };

    const handleSaveClick = () => {
        setActionType('save');
        setShowConfirmation(true);
    };

    const handleCloseClick = () => {
        setActionType('close');
        setShowConfirmation(true);
    };

    const handleActionClick = (type: 'save' | 'close') => {
        setActionType(type);
        setShowConfirmation(true);
    };

    const handleConfirm = () => {
        setShowConfirmation(false);
        if (actionType === 'save') {
            handleSaveEdit(product);
        } else if (actionType === 'close') {
            onClose();
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center p-4">
            <div className="modal bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
                <form onSubmit={handleSubmit} className="p-6 md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="space-y-2">
                            {fields.map((field) => field.name === 'image' && (
                                <div key={field.name}>
                                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                        {field.label}
                                    </label>
                                    <img
                                        src={getValue(field)}
                                        alt={`Imagen de ${editingProduct.name}`}
                                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-6 mt-6 md:mt-0">
                        {fields.map((field) => field.name !== 'image' && (
                            <div key={field.name} className="space-y-2">
                                <InputField
                                    label={field.label}
                                    name={field.name}
                                    value={getValue(field)}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    type={field.type}
                                    options={field.options}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-4 mt-6 md:mt-0 md:col-span-3">
                        <button type="button" onClick={() => handleActionClick('save')} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={() => handleActionClick('close')} className="inline-flex items-center justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
            {showConfirmation && (
                <ModalAlert
                    title="Confirmación"
                    message={`¿Estás seguro de que quieres ${actionType === 'save' ? 'guardar los cambios' : 'cerrar el modal'}?`}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </div>

    );
};

const materials = ["ABS", "PLA", "TPU"];
const sizes = ["Small", "Medium", "Large"];
const categorys = ["Category A", "Category B", "Category C"];
