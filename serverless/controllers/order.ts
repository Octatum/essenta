import { Request, Response } from 'express';
import { validationResult, checkSchema } from 'express-validator/check';
import ip from 'ip';
import FormData from 'form-data';
import fetch, { Headers } from 'node-fetch';
import { Buffer } from 'buffer';

import * as OrderModel from '../models/Order';
import * as ProductModel from '../models/Product';
import * as DeliveryModel from '../models/Delivery';
import logger from '../util/logger';
import { createUniqueId } from '../util/faunaClient';

export async function allOrders(req: Request, res: Response): Promise<any> {
  logger.log('info', 'Listing all orders');
  try {
    const orders = await OrderModel.getAllOrders();

    res.json(orders);
  } catch (exception) {
    logger.log('error', exception);
    res.sendStatus(500);
  }
}

export const orderValidationSchema = checkSchema({
  deliveryId: {
    in: ['body'],
    errorMessage: 'Es necesario elegir el tipo de envío.',
    optional: false,
  },
  customerData: {
    in: ['body'],
    errorMessage: 'Los datos del cliente son requeridos.',
    optional: false,
  },
  products: {
    in: ['body'],
    isLength: {
      errorMessage: 'El carrito debe contener al menos un objeto',
      options: { min: 1 },
    },
    optional: false,
  },
  'products.*.id': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador.',
    isString: {
      errorMessage: 'El identificador de un producto debe ser un string.',
    },
    optional: false,
  },
  'products.*.colorId': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador de color.',
    isString: {
      errorMessage: 'El identificador de un color debe ser un string.',
    },
    optional: false,
  },
  'products.*.fraganceId': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador de fragancia.',
    isString: {
      errorMessage: 'El identificador de una fragancia debe ser un string.',
    },
    optional: false,
  },
  'products.*.amount': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener una cantidad.',
    isInt: {
      errorMessage: 'El valor de amount debe ser numérico.',
    },
    toInt: true,
    optional: false,
  },
});

export async function createOrder(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.log('info', 'Wrong data structure for a new Order');
    return res.status(422).json({ errors: errors.array() });
  }

  logger.log('info', 'Creating order');

  const { products, customerData, deliveryId } = req.body;

  try {
    const orderId: any = await OrderModel.createOrder(products, customerData);
    const orderItems: any[] = await Promise.all(
      products.map((product: OrderModel.APIItem) =>
        ProductModel.getProduct(product)
      )
    );
    const deliveryData: any = await DeliveryModel.getDeliveryData(deliveryId);
    const itemsTotalCost: Number = orderItems.reduce(
      (accum, current) => current.price * current.amount + accum,
      0
    );
    const totalCost = deliveryData.price + itemsTotalCost;
    const redirectionUrl: String = await getRedirectionUrl(orderId, totalCost);
    res.json({ orderId, redirectionUrl });
  } catch (exception) {
    logger.log('error', exception);
    res.sendStatus(500);
  }
}

async function getRedirectionUrl(orderId: String, totalCost: Number) {
  const formData = new FormData();
  const headers = new Headers();
  const username = process.env.TP_USER;
  const password = process.env.TP_PASS;
  const hostUrl = process.env.TP_URL;

  // Preparar datos y hacer encode como Form (necesario para TP)
  formData.append('CONTROL_NUMBER', orderId.toString());
  formData.append('AMOUNT', totalCost.toString());
  formData.append('ADDRESS', ip.address());

  // Preparar datos de autenticacion
  const base64AuthData: string = Buffer.from(
    `${username}:${password}`
  ).toString('base64');
  headers.append('AUTHORIZATION', `Basic ${base64AuthData}`);

  const response = await fetch(hostUrl, {
    method: 'POST',
    body: formData,
    headers,
  });

  const jsonResponse = await response.json();

  let redirectionUrl: String = jsonResponse.msgError;

  redirectionUrl = redirectionUrl.slice(17, -2);

  return redirectionUrl;
}

export async function test(req: Request, res: Response): Promise<any> {
  logger.log('info', JSON.stringify(req));

  try {
    const totalCost: Number = 1;
    const objectId = await createUniqueId();
    const orderId: String = objectId.toString();
    logger.log(
      'info',
      JSON.stringify({
        totalCost,
        orderId,
      })
    );
    const redirectionUrl: String = await getRedirectionUrl(orderId, totalCost);
    res.json({ orderId, redirectionUrl });
  } catch (exception) {
    logger.log('error', exception);
    res.sendStatus(500);
  }
}

async function validateTransaction(idTran: string, lnk: string) {
  const formData = new FormData();
  const headers = new Headers();
  const username = process.env.TP_USER;
  const password = process.env.TP_PASS;
  const hostUrl = process.env.TP_URL;

  // Preparar datos y hacer encode como Form (necesario para TP)
  formData.append('CONTROL_NUMBER', idTran);
  formData.append('REFERENCE', lnk);

  // Preparar datos de autenticacion
  const base64AuthData: string = Buffer.from(
    `${username}:${password}`
  ).toString('base64');
  headers.append('AUTHORIZATION', `Basic ${base64AuthData}`);

  const response = await fetch(hostUrl, {
    method: 'POST',
    body: formData,
    headers,
  });

  const jsonResponse = await response.json();

  return jsonResponse;
}

export async function updateOrder(req: Request, res: Response) {
  console.log('Updating order');
  console.log(req);
  const { idTran, lnk } = req.query;
  const validationResponse = await validateTransaction(idTran, lnk);
  console.log(validationResponse);

  if (validationResponse.status === 'Aprobada') {
    OrderModel.updateOrderStatus(idTran, OrderModel.OrderStatus.approved);
  }

  res.sendStatus(200);
}
