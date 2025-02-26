import { ProductOption } from '../types/product';
import { fetchWithAuth } from '../utils/fetchWithAuth';
import { BASE_URL } from '../utils/apiUrl';

export const ProductApis = {
  getProducts: '/api/admin/v1/products',
  createProduct: '/api/admin/v1/products',
  getProductById: (id: string) => `/api/admin/v1/products/${id}`,
} as const;

export interface CreateProductData {
  name: string;
  description: string;
  price: string;
  providerId: string;
  categoryId: string;
  options?: ProductOption[];
  mainImage: File | null;
  detailImages: File[];
}

const createFormData = (data: CreateProductData) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined) return;

    if (key === 'mainImage' || key === 'detailImages' || key === 'options') {
      return; // Skip these special fields for now
    }
    formData.append(key, value);
  });

  if ('mainImage' in data && data.mainImage) {
    formData.append('mainImage', data.mainImage);
  }

  if ('detailImages' in data && data.detailImages) {
    data.detailImages.forEach((file) => {
      formData.append('detailImages', file);
    });
  }

  // Handle options separately
  if (data.options && data.options.length > 0) {
    data.options.forEach((option, index) => {
      formData.append(`options[${index}].name`, option.name);
      option.optionDetails.forEach((detail, detailIndex) => {
        formData.append(`options[${index}].optionDetails[${detailIndex}].value`, detail.value);
        formData.append(`options[${index}].optionDetails[${detailIndex}].optionOrder`, detail.optionOrder.toString());
        formData.append(
          `options[${index}].optionDetails[${detailIndex}].additionalPrice`,
          detail.additionalPrice.toString(),
        );
      });
    });
  }

  // Handle image files
  if (data.mainImage) {
    formData.append('mainImage', data.mainImage);
  }

  if (data.detailImages.length > 0) {
    data.detailImages.forEach((file) => {
      formData.append('detailImages', file);
    });
  }

  return formData;
};

export interface Provider {
  id: number;
  name: string;
  code: string;
}

export const productApi = {
  // 상품 상세 조회
  getProductById: async (productId: string) => {
    const response = await fetchWithAuth(`${BASE_URL}${ProductApis.getProductById(productId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    return response.json();
  },

  // 상품 목록 조회
  getProducts: async ({ pageSize = 10, pageNumber = 1 } = {}) => {
    const queryParams = new URLSearchParams({
      size: pageSize.toString(),
      page: (pageNumber - 1).toString(),
    });

    const response = await fetchWithAuth(`${BASE_URL}${ProductApis.getProducts}?${queryParams}`, {
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

  // 상품 등록
  createProduct: async (data: CreateProductData) => {
    const formData = createFormData(data);
    const response = await fetchWithAuth(`${BASE_URL}${ProductApis.createProduct}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  },
};
