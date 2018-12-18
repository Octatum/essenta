import {
  getResultOfIndeces,
  Indices,
  Classes,
  createInstanceForClass,
  createUniqueId,
} from '../util/faunaClient';

const COLLECTION_NAME = 'order';

export type APIItem = {
  id: string;
  amount: number;
  colorId: string;
  fraganceId: string;
};

export type Order = {
  id: string;
  items: APIItem[];
  customer: any;
};

export type OrderModel = {
  getAllOrders: getAllOrdersFunction;
  getOrderById: getOrderByIdFunction;
  createOrder: createOrderFunction;
};

type getAllOrdersFunction = () => Promise<Order[]>;
type getOrderByIdFunction = (orderId: string) => Order;
type createOrderFunction = (items: APIItem[], customer: any) => String;

export async function createOrder(items: any[], customer: any) {
  // TODO: usar customer
  const orderId = await createUniqueId();

  const data = {
    id: orderId,
    products: items,
  };

  const object = await createInstanceForClass(Classes.ORDERS, data);
  console.log(object);

  return orderId;
}

export enum OrderStatus {
  canceled = -1,
  waiting = 0,
  approved = 1,
}

export async function getAllOrders() {
  const result = await getResultOfIndeces(Indices.ALL_ORDERS);

  return result;
}
