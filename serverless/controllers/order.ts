import { Request, Response } from 'express';
import { validationResult, checkSchema } from 'express-validator/check';
import ip from 'ip';
import FormData from 'form-data';
import fetch, { Headers } from 'node-fetch';
import { Buffer } from 'buffer';

import * as OrderModel from '../models/Order';
import * as ProductModel from '../models/Product';
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
  items: {
    in: ['body'],
    isLength: {
      errorMessage: 'El carrito debe contener al menos un objeto',
      options: { min: 1 },
    },
    optional: false,
  },
  'items.*.id': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador.',
    isString: {
      errorMessage: 'El identificador de un producto debe ser un string.',
    },
    optional: false,
  },
  'items.*.colorId': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador de color.',
    isString: {
      errorMessage: 'El identificador de un color debe ser un string.',
    },
    optional: false,
  },
  'items.*.fraganceId': {
    in: ['body'],
    errorMessage: 'Cada producto debe contener un identificador de fragancia.',
    isString: {
      errorMessage: 'El identificador de una fragancia debe ser un string.',
    },
    optional: false,
  },
  'items.*.amount': {
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
    logger.log('info', 'Wrong order data structure');
    return res.status(422).json({ errors: errors.array() });
  }

  logger.log('info', 'Creating order');

  const { items, customer } = req.body;

  try {
    const orderId: any = await OrderModel.createOrder(items, customer);
    const orderItems: any[] = await Promise.all(
      items.map((item: OrderModel.APIItem) => ProductModel.getProduct(item))
    );
    const totalCost: Number = orderItems.reduce(
      (accum, current) => current.price * current.amount + accum,
      0
    );
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

export async function updateOrder(req: Request, res: Response) {
  logger.log('info', 'Updating order:', req);
  res.sendStatus(200);
}
