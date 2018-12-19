import {
  getResultOfIndeces,
  Indices,
  Classes,
  createInstanceForClass,
  createUniqueId,
  runIndex,
  updateFromRef,
} from '../util/faunaClient';

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

export async function createOrder(items: any[], customerData: any) {
  const orderId = await createUniqueId();

  const data = {
    id: orderId,
    products: items,
    customerData,
    status: OrderStatus.waiting,
  };

  await createInstanceForClass(Classes.ORDERS, { data });

  return orderId;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orderRef = await runIndex(Indices.ORDER_BY_ID, orderId);
  await updateFromRef(orderRef, {
    status,
  });
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
