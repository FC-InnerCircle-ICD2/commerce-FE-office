import { fetchWithAuth } from '../utils/fetchWithAuth';
import { BASE_URL } from '../utils/apiUrl';

export const BannerApis = {
  createBanner: '/api/admin/v1/banners',
} as const;

export const BANNER_TYPE = {
  PRODUCT: 'PRODUCT',
  EVENT: 'EVENT',
} as const;

export type BannerType = (typeof BANNER_TYPE)[keyof typeof BANNER_TYPE];

export interface CreateBannerData {
  type: BannerType;
  title: string;
  description: string;
  bannerOrder: number;
  startDate: string;
  endDate: string;
  isDeleted: boolean;
  productId?: number;
  linkUrl?: string;
  linkType?: string;
  bannerImage?: File | null;
  iconImage?: File | null;
}

const formatDate = (dateString: string) => {
  return dateString.slice(0, 19);
};

const createFormData = (data: CreateBannerData) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === 'startDate' || key === 'endDate') {
      formData.append(key, formatDate(value as string));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

export const bannerApi = {
  // 배너 등록
  createBanner: async (data: CreateBannerData) => {
    const response = await fetchWithAuth(`${BASE_URL}${BannerApis.createBanner}`, {
      method: 'POST',
      body: createFormData(data),
    });

    if (!response.ok) {
      throw new Error('배너 등록에 실패했습니다.');
    }

    return response.json();
  },
};
