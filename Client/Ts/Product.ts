import {  ChangeEvent } from "react";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  size: string;
  material: string;
  category: string;
  deleted: boolean;
  count?: number
  averageScore?: number;
  countReviews?: number;
  Reviews?: Array<any>;
  handleAddToCart?: (productId: number) => void;
}

export interface Order {
  order: {
    id: number;
    total: number;
    paypalId: string;
    UserId: number;
    createdAt: string;
    updatedAt: string;
  };
  productIds: number[];
  products?: Product[]; // Añadido para almacenar los detalles del producto
}

export interface OrdersProps {
  orders: {
    count: number;
    ordersWithProducts: Order[];
  };
}

export interface RootState {
  products: Product[];
  error: string;
  currentPage: number;
  limit: number;
}

export interface ProductsApiResponse {
    results: Product[];
    count: number;
}
export interface EditedProductProps {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  size: string;
  material: string;
  category: string;
  deleted: boolean;
  [key: string]: string | number | File | boolean | undefined;
}
export interface ProductsRowProps {
  product: Product;
  editingProducts: Product | null;
  handleSaveEdit: (productId: number) => void;
  handleEditClick?: (product: Product) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDeleteChange: (productId: number, isDeleted: boolean) => void;
}

export type EditableFieldProps = {
  editing: boolean;
  value: string | number | readonly string[] | undefined;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number" | "password" | "email" | "date"; // Ajusta los tipos permitidos aquí
};


export type ModalEditProductsProps = {
    editingProduct: Product;
    show: boolean;
    onClose: () => void;
    handleSaveEdit: (product: Product) => void;
};

export type InputFieldProps = {
    label: string;
    name: keyof Product;
    value: string | number | boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    placeholder: string;
    type?: string;
    options?: (string | boolean)[]; // Para las listas desplegables
};

export type Field = {
        label: string;
        name: keyof Product;
        placeholder: string;
        type: string;
        valueType: "string" | "number" | "boolean";
        options?: (string | boolean)[]; // Para las listas desplegables
    };