import { fetchWithAuth } from '../utils/fetchWithAuth';

export const BASE_URL = '//15.165.99.137:9998';

export const DashboardApi = {
  getDashboard: '/api/v1/admin/search',
} as const;

export const dashboardApi = {
  //Dashboard 조회
  getDashboard: async () => {
    const response = await fetchWithAuth(`${BASE_URL}${DashboardApi.getDashboard}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },
};
