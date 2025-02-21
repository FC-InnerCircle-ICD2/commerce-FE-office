import { ProductOption } from '../types/product';

const BASE_URL = '/admin/v1/products';

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

    if (key !== 'mainImage' && key !== 'detailImages' && key !== 'options') {
      formData.append(key, value);
    } else if (key === 'options' && value) {
      formData.append('options', JSON.stringify(value));
    }
  });

  if ('mainImage' in data && data.mainImage) {
    formData.append('mainImage', data.mainImage);
  }

  if ('detailImages' in data && data.detailImages) {
    data.detailImages.forEach((file) => {
      formData.append('detailImages', file);
    });
  }

  return formData;
};

export const productApi = {
  // 상품 등록
  createProduct: async (data: CreateProductData) => {
    const formData = createFormData(data);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  },
};
