"use client"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { URL_BACKEND } from "@/config.js";

interface PagoPaypalProps {
    cart: any[];
    setCart: (cart: any[]) => void;
}
interface YourUserType {
    userId: number;
}

interface YourStateType {
    userData: YourUserType;
}

export default function PagoPaypal({ cart, setCart }: PagoPaypalProps) {
    const user = useSelector((state: YourStateType) => state.userData);

    useEffect(() => {
        let userData: YourUserType | undefined;
        if (user?.userId) {
            userData = user;
        }

        const script = document.createElement("script");
        script.src = process.env.NEXT_PUBLIC_PAYPAL!;
        script.async = true;

        script.onload = () => {
            if (window.paypal && window.paypal.Buttons) {
                window.paypal
                    .Buttons({
                        style: {
                            color: "blue",
                            shape: "pill",
                            label: "pay",
                        },
                        async createOrder() {
                            try {
                                const response = await fetch(`${URL_BACKEND}api/orders`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        cart,
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
                                resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
                            }
                        },
                        async onCancel(data: any) {
                            alert("hola");
                        },
                        async onApprove(data: { orderID: any; }, actions: { restart: () => any; }) {
                            try {
                                const response = await fetch(`${URL}api/orders/${data.orderID}/capture`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        cart,
                                        userData,
                                    }),
                                });

                                const orderData = await response.json();
                                const errorDetail = orderData?.details?.[0];

                                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                    return actions.restart();
                                } else if (errorDetail) {
                                    throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                                } else if (!orderData.purchase_units) {
                                    throw new Error(JSON.stringify(orderData));
                                } else {
                                    const transaction =
                                        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                                        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                                    resultMessage(
                                        `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
                                    );
                                    localStorage.removeItem("cart");
                                    setCart([]);
                                }
                            } catch (error) {
                                console.error(error);
                                resultMessage(`Sorry, your transaction could not be processed...<br><br>${error}`);
                            }
                        },
                    })
                    .render("#paypal-button-container");
            } else {
                console.error('PayPal SDK not loaded');
            }
        };

        document.body.appendChild(script);

        function resultMessage(message: any) {
            alert("hola");
        }
    }, [cart, user, setCart]);

    return (
        <div>
            {cart.length > 0 ? (
                <div className="">
                    <h1>Elija su metodo de pago</h1>
                    <div id="paypal-button-container" className=""></div>
                </div>
            ) : (
                <div className="">
                    <h1>El carrito está vacío. Agregue productos antes de proceder al pago.</h1>
                </div>
            )}
        </div>
    );
}
