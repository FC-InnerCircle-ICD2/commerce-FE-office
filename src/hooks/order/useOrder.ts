import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '../../utils/fetchWithAuth';

export interface IOrder {
  orderAt: string;
  orderId: string;
  orderStatus: string;
  paymentMethod: string;
  totalPrice: number;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface IOrderResponse {
  content: IOrder[];
  page: Page;
}

async function getOrder(pageNumber: number, pageSize: number = 10, orderId?: string) {
  const queryParams = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  });
  const response = await fetchWithAuth(
    `https://order-api.emmotional-cart.click/api/admin/v1/orders?${queryParams}${orderId && `&orderId=${orderId}`}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const result: IOrderResponse = await response.json();
  return result;
}

export const useGetOrder = (pageNumber: number, pageSize: number = 10, orderId?: string) => {
  return useQuery({
    queryKey: ['order', pageNumber, pageSize, orderId],
    queryFn: () => getOrder(pageNumber, pageSize, orderId),
  });
};
