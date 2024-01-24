import { configureStore } from '@reduxjs/toolkit';
import { ProductsApi } from './services/ProductsApi';
import { searchSlice } from './features/SearchSlice'; 
import { logInSlice } from './features/LogInSlice'; 
import { authSlice } from './features/authSlice'; 

export const store = configureStore({
    reducer: {
        [ProductsApi.reducerPath]: ProductsApi.reducer,
        search: searchSlice.reducer,
        logIn: logInSlice.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProductsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
