"use client"

import { useState } from "react";
import { ModalAddProducts } from '@/Components';

export const AddProductButton = () => {
    const [showModal, setShowModal] = useState(false);

    const openAddProductModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button onClick={openAddProductModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Agregar Productos
            </button>
            {showModal &&
                <ModalAddProducts
                    showModal={showModal}
                    onClose={closeModal}
                />
            }
        </div>
    );
}
