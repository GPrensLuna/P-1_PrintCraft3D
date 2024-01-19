import { URL_BACKEND } from '@/config';

export const apiService = {
    login: async (formData: any) => {
        const url = `${URL_BACKEND}login`; // URL de la solicitud
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Solicitud exitosa a ${url}`, data); // Muestra la respuesta exitosa
                return data;
            } else {
                // Error de respuesta del servidor (como 4xx o 5xx)
                const errorData = await response.text();
                throw new Error(`Error ${response.status} en ${url}: ${errorData}`);
            }
        } catch (error) {
            // Error de red o al procesar la respuesta
            console.error(`Error al realizar la solicitud a ${url}`, error);
        }
    },
};
