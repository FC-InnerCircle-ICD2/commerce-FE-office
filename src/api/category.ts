import { fetchWithAuth } from '../utils/fetchWithAuth';
import { BASE_URL } from '../utils/apiUrl';

export const CategoryApi = {
  getCategories: '/api/v1/categories',
} as const;

export const categoryApi = {
  // 카테고리 조회
  getCategory: async () => {
    const response = await fetchWithAuth(`${BASE_URL}${CategoryApi.getCategories}`, {
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
