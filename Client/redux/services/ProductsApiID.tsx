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
            query: async ({ id }) => {
                try {
                    const url = `Product/${id}`;
                    console.log(url);
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error("Request failed");
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    throw new Error(`Error fetching products: ${error.message}`);
                }
            },
        }),
    }),
});


export const { useGetProductsQuery } = ProductsApiID;
