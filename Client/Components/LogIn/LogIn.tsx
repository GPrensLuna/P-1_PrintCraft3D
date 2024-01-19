"use client"
import { useState, FormEvent } from 'react';
import { URL_BACKEND } from '@/config.js';

type FormData = {
  email: string;
  password: string;
};

export const LogIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL_BACKEND}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div >

      <div >
        <form onSubmit={handleFormSubmit}>
          <h2 >LOGIN</h2>

          <div >
            <label htmlFor="email" >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"

              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div >
            <label htmlFor="password" >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"

              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div >
            <button type="submit" >
              INICIAR
            </button>
          </div>

          <h4 >
            ¿Aún no te has registrado?
            <span> Regístrate</span>
          </h4>
        </form>
      </div>
    </div>
  );
}
