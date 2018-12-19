import * as contentfulApi from '../util/contentfulApi';

export type OrderProduct = {
  containerName: string;
  fraganceName: string;
  colorName: string;
  price: number;
  amount: number;
};

export async function getDeliveryData(deliveryId: string) {
  const deliveryData = await contentfulApi.getDataById(deliveryId);

  return deliveryData;
}
