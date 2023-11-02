import React, { useEffect } from 'react';
import style from './PagoPaypal.module.css'

const { URL } = require('../../config.js')

//import { useHistory } from 'react-router-dom';

export default function PagoPaypal () {
    useEffect( () => {

      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=AX9x2jfxzV8uGUYopXvUCznoG20uKrzb_eLQIyo2qmKN8N4L7JMuhNle5iwqa4pxY5L5oTbEPapXAE0v&currency=USD';
      script.async = true;

      script.onload = () => {
              window.paypal.Buttons({
                style: {
                  color: 'blue',
                  shape: 'pill',
                  label: 'pay',
                },
                async createOrder() {
                  try {
                    const response = await fetch(`${URL}api/orders`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      // use the "body" param to optionally pass additional order information
                      // like product ids and quantities
                      body: JSON.stringify({
                        cart: [
                          {
                            id: 1,
                            quantity: 1,
                          },
                        ],
                      }),
                    });
                    
                    const orderData = await response.json();
                    
                    if (orderData.id) {
                      return orderData.id;
                    } else {
                      const errorDetail = orderData?.details?.[0];
                      const errorMessage = errorDetail ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})` : JSON.stringify(orderData);
                        throw new Error(errorMessage);
                    }
                  } catch (error) {
                    console.error(error);
                    resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
                  }
                },
                async onCancel(data) {
                  alert('Payment canceled')
                },
                async onApprove(data, actions) {
                  try {
                    const response = await fetch(`${URL}api/orders/${data.orderID}/capture`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    
                    const orderData = await response.json();
                    // Three cases to handle:
                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    //   (2) Other non-recoverable errors -> Show a failure message
                    //   (3) Successful transaction -> Show confirmation or thank you message
                    
                    const errorDetail = orderData?.details?.[0];
                    
                    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                      // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                      // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                      return actions.restart();
                    } else if (errorDetail) {
                      // (2) Other non-recoverable errors -> Show a failure message
                      throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                    } else if (!orderData.purchase_units) {
                      throw new Error(JSON.stringify(orderData));
                    } else {
                      // (3) Successful transaction -> Show confirmation or thank you message
                      // Or go to another URL:  actions.redirect('thank_you.html');
                      const transaction =
                        orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                        orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                      resultMessage(
                        `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
                      );
                      console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2),
                      );
                    }
                  } catch (error) {
                    console.error(error);
                    resultMessage(
                      `Sorry, your transaction could not be processed...<br><br>${error}`,
                    );
                  }
                },
                
              })
             .render("#paypal-button-container");
            }

            document.body.appendChild(script);
         
      // Example function to show a result to the user. Your site's UI library can be used instead.
      function resultMessage(message) {
        const container = document.querySelector("#result-message");
        container.innerHTML = message;
      }
      
    }, [])
  
    return (
      <div>
        <h1>Elija su metodo de pago</h1>
        <div id="paypal-button-container" className={style.divPaypal}></div>
        {/* Resto del contenido de la página de Inventario */}
      </div>
    )
}