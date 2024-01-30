"use client"
import { ModalShowPaymentProps, CartItem } from '@/Ts/ModalWindows';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { URL_BACKEND } from '@/config';
import { useSession } from "next-auth/react";


export const ModalShowPayment = ({ title, total, cartItems, onConfirm, onCancel }: ModalShowPaymentProps) => {
  const { data: session } = useSession();

  const clientId = String(process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID);

  const createOrder = async (userId: number) => {
    try {
      const response = await fetch(`${URL_BACKEND}api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartItems,
          userId: userId,
        }),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      // Manejar el error en la interfaz de usuario
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <section className="bg-white shadow-[0px_187px_75px_rgba(0,0,0,0.01),0px_105px_63px_rgba(0,0,0,0.05),0px_47px_47px_rgba(0,0,0,0.09),0px_12px_26px_rgba(0,0,0,0.1),0px_0px_0px_rgba(0,0,0,0.1)] rounded-[26px]  p-5 ">
        <button onClick={onCancel} className="text-black hover:cursor-pointer hover:border-double">X</button>

        <div className="grid grid-cols-1 gap-5 justify-center items-center w-96">
          <PayPalScriptProvider options={{ clientId }}>
            <PayPalButtons createOrder={() => createOrder(session?.user?.id)} />
          </PayPalScriptProvider>
        </div>
      </section>
    </div>
  );
};
