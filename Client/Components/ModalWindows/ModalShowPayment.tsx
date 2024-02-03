/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { ModalShowPaymentProps } from '@/Ts/ModalWindows';
import { URL_BACKEND } from '@/config';

export const ModalShowPayment = ({ title, total, cartItems, onConfirm, onCancel }: ModalShowPaymentProps) => {
  const { data: session } = useSession();
  const clientId = String(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

  const createOrder = async () => {
    try {
      const body = {
        cart: cartItems.map(item => ({
          price: item.price,
          cantidad: item.count
        })),
        user: session?.user
      };

      const response = await fetch(`${URL_BACKEND}api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create order. ' + (orderData.error || 'Unknown error'));
      }
      // Guarda el objeto orderData completo
      localStorage.setItem('orderData', JSON.stringify(orderData))
      console.log("orderData", orderData)
      return orderData.id; // Aunque este retorno es correcto, asegúrate de que es necesario para tu flujo.
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire("Error", "No se pudo iniciar el proceso de pago.", "error");
    }
  };



  const onApprove = async () => {
    try {
      const storedOrderData = localStorage.getItem('orderData');
      if (!storedOrderData) {
        throw new Error("Order data is missing.");
      }

      const orderData = JSON.parse(storedOrderData);

      const response = await fetch(`${URL_BACKEND}api/orders/${orderData.id}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: orderData.id,
          cart: cartItems,
          userData: session?.user

        }),
      });

      const captureData = await response.json();

      if (!response.ok) {
        throw new Error('Failed to capture order. ' + (captureData.error || 'Unknown error'));
      }

      Swal.fire("Success", "El pago se ha completado con éxito.", "success");
      if (onConfirm) onConfirm(captureData);
    } catch (error) {
      console.error("Error capturing order:", error);
      Swal.fire("Error", "El pago no pudo ser procesado.", "error");
    }
  };




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <section className="bg-white shadow rounded p-5">
        <button onClick={onCancel} className="text-black hover:cursor-pointer">X</button>
        <div className="text-center">
          <h2>{title}</h2>
          <p>Total: ${total}</p>
        </div>
        <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={createOrder}
            onApprove={onApprove}

            onCancel={onCancel}
          />
        </PayPalScriptProvider>
      </section>
    </div>
  );
};
