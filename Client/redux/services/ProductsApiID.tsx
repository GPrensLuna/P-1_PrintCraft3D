import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_BACKEND } from "@/config";
import { Product } from "@/Ts/Product";

interface LoadProductsArgs {
    id?: number;
}

export const ProductsApiID = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: URL_BACKEND }),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], LoadProductsArgs>({
            query: ({ id }) => `Product/${id}`, // Devolvemos la URL directamente
        }),
    }),
});

export const { useGetProductsQuery } = ProductsApiID;
