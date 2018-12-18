import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import ip from 'ip';
import FormData from 'form-data';
import fetch, { Headers } from 'node-fetch';
import { Buffer } from 'buffer';

import * as OrderModel from '../models/Order';
import * as ProductModel from '../models/Product';
import logger from '../util/logger';

export async function allOrders(req: Request, res: Response): Promise<any> {
  logger.log('info', 'Listing all orders');
  try {
    const orders = await OrderModel.getAllOrders();
    console.log(orders);

    res.json(orders);
  } catch (exception) {
    console.log(exception);
    res.sendStatus(400);
  }
}

export async function createOrder(req: Request, res: Response): Promise<any> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
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
  } catch (error) {
    logger.log('error', error);
    res.sendStatus(400);
  }
}

const testItems = [
  {
    id: '5YPO1Smo3mcMoqkMcGOK0W',
    amount: '23',
    colorId: '4Cjuek1kdqgGswW0iOwawc',
    fraganceId: '52fomcNjNKAimUeOuM2QOq',
  },
  {
    id: '69sC7kthhSEkYscyQu8WEQ',
    amount: '2',
    colorId: '592DUMfwiQQ64egUsOOaI4',
    fraganceId: '52fomcNjNKAimUeOuM2QOq',
  },
];

export async function testCreateOrder(req: Request, res: Response) {
  try {
    const orderId: any = await OrderModel.createOrder(testItems, {});
    const orderItems: any[] = await Promise.all(
      testItems.map((item: any) => ProductModel.getProduct(item))
    );
    const totalCost: Number = orderItems.reduce(
      (accum, current) => current.price * current.amount + accum,
      0
    );
    const redirectionUrl: String = await getRedirectionUrl(orderId, totalCost);
    res.json({ orderId, redirectionUrl });
  } catch (error) {
    logger.log('error', error);
    res.sendStatus(400);
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

export async function updateOrder(req: Request, res: Response) {
  logger.log('info', 'Updating order:', req);
  res.sendStatus(200);
}
