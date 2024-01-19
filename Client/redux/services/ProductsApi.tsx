import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BACKEND } from '@/config';
import { Product } from '@/Ts/Product';

interface LoadProductsArgs {
    page?: number;
    limit?: number;
    selectedMaterials?: string | string[];
    selectedCategory?: string | string[];
    selectedSize?: string | string[];
    search?: string;
}



export const ProductsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: URL_BACKEND }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], LoadProductsArgs>({
            query: ({ page = 1, limit = 12, selectedMaterials = '', selectedCategory = '', selectedSize = '', search = '' }) => {
                const queryParams = new URLSearchParams({
                    page: page.toString(),
                    limit: limit.toString(),
                    material: Array.isArray(selectedMaterials) ? selectedMaterials.join(',') : selectedMaterials,
                    category: Array.isArray(selectedCategory) ? selectedCategory.join(',') : selectedCategory,
                    tamaño: Array.isArray(selectedSize) ? selectedSize.join(',') : selectedSize,
                    search,
                });
                const url = `Inventario?${queryParams.toString()}`;
                return url;
            }
        }),
    }),
});

export const { useGetProductsQuery } = ProductsApi;
