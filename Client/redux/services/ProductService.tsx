import { Product } from "@/Ts/Product";
import { URL_BACKEND } from "@/config.js";

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${URL_BACKEND}ProductsLista`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error al obtener los productos");
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error("Error en fetchProducts:", error);
        throw error;
    }
};

export const updateProduct = async (productId: number, productData: Product): Promise<void> => {
    try {
        const response = await fetch(`${URL_BACKEND}ProductsLista/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        if (!response.ok) {
            throw new Error("Error al actualizar el producto");
        }
    } catch (error) {
        console.error("Error en updateProduct:", error);
        throw error;
    }
};
