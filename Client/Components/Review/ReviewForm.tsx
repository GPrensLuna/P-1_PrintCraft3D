"use client"
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { URL_BACKEND } from '@/config';


interface ReviewFormProps {
    productId: number;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
    const [score, setScore] = useState(0);
    const { data: session } = useSession();
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL_BACKEND}Reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: session?.user.email,
                    ProductId: productId,
                    score,
                    description,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la reseña');
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error: any) {
            setMessage(error.message || 'Error al enviar la reseña.');
        }
    };

    return (
        <form onSubmit={submitReview}>
            <input
                type="number"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                placeholder="Puntuación"
                min="1"
                max="5"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción de tu experiencia"
                required
            />
            <button type="submit">Enviar reseña</button>
            {message && <p>{message}</p>}
        </form>
    );
};