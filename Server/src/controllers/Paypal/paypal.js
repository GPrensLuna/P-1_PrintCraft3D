import(`node-fetch`);
require("dotenv").config();
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = require("../../config");
const base = "https://api-m.sandbox.paypal.com";
const { PostBuyOrder } = require("../Post/PostBuyOrder");
const deleteShoppingCart = require("../deleteShoppingCart");

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.cantidad;
  });

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: total,
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

const create = async (req, res) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

const capture = async (req, res) => {
  try {
    const { orderID } = req.params;
    const { cart } = req.body;
    const { userData } = req.body;

    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);

    if (httpStatusCode === 200 || httpStatusCode === 201) {
      await PostBuyOrder(
        (req = {
          body: {
            payment: {
              id: jsonResponse.id,
              value:
                jsonResponse.purchase_units[0].payments.captures[0].amount
                  .value,
            },
            cart: cart,
            user: userData,
          },
        }),
        res
      );

      await deleteShoppingCart(
        (req = {
          body: {
            userId: userData.userId,
          },
        }),
        res
      );
    }
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

module.exports = {
  capture,
  create,
};
