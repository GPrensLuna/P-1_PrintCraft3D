import paypal from '@paypal/checkout-server-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

// Definiendo las interfaces para los datos que se reciben
interface Item {
  [x: string]: any;
  name: string;
  description: string;
  quantity: string; // Asegúrate de que esto es un string si es lo que PayPal espera
  unit_amount: {
    currency_code: string;
    value: string;
  };
  category: string; // Añadiendo la propiedad faltante
}


interface RequestBody {
  items: Item[];
  total: string;
}

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string;
const clientSecret = process.env.NEXT_PUBLIC_PAYPAL_SECRET as string;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function post(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

    try {
      const { items, total } = req.body as RequestBody;

      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              }
            }
          },
          items: items.map(item => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: "USD",
              value: item.price.toString(),
            },
              category: "PHYSICAL_GOODS" // Añade la categoría adecuada aquí
          }))
        }]
      });

      const response = await client.execute(request);
      return res.status(200).json({ id: response.result.id });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
