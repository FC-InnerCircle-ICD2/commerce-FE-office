export const PAGE_ROUTE = {
  LOGIN: '/login',
  JOIN: '/join',
  DASHBOARD: '/dashborad',
  PRODUCT: '/product',
  PRODUCT_REGISTER: '/product/0',
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  BANNER: '/banner',
  BANNER_REGISTER: '/banner/0',
  ORDER: '/order',
} as const;
