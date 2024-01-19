import { configureStore } from '@reduxjs/toolkit';
import { ProductsApi } from './services/ProductsApi';
import { searchSlice } from './features/SearchSlice'; 

export const store = configureStore({
    reducer: {
        [ProductsApi.reducerPath]: ProductsApi.reducer,
        search: searchSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
