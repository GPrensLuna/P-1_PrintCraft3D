import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL_BACKEND } from '@/config';

interface LoginArgs {
    formData: any;
}

export const apiService = createApi({
    reducerPath: 'apiService',
    baseQuery: fetchBaseQuery({ baseUrl: URL_BACKEND }),
    endpoints: (builder) => ({
        login: builder.mutation<any, LoginArgs>({
            query: (loginArgs) => ({
                url: 'login',
                method: 'POST',
                body: loginArgs.formData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            transformResponse: (response, meta, arg) => {
                if (meta && meta.response && meta.response.ok && meta.response.headers.get('content-type')?.includes('application/json')) {
                    return response;
                } else {
                    throw new Error('Respuesta no es JSON o el estado no es 200');
                }
            },
        }),
    }),
});

export const { useLoginMutation } = apiService;
