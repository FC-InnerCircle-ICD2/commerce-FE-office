import { fetchWithAuth } from '../utils/fetchWithAuth';

export const BASE_URL = 'https://order-api.emmotional-cart.click';

export const DashboardApi = {
  getDashboard: '/api/v1/admin/search',
} as const;

export const dashboardApi = {
  // Dashboard 조회 (키워드 검색 기능 추가)
  getDashboard: async (keyword = '') => {
    const queryParams = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    const response = await fetchWithAuth(`${BASE_URL}${DashboardApi.getDashboard}${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard');
    }
    return response.json();
  },
};
