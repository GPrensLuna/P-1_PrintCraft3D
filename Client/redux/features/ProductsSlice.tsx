import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from "@/Ts/Product";

interface ProductsState {
    products: Product[];
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    error: null
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { setProducts, setError } = productsSlice.actions;
export default productsSlice.reducer;
