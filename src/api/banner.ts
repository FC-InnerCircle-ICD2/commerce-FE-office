import { fetchWithAuth } from '../utils/fetchWithAuth';
import { BASE_URL } from '../utils/apiUrl';
import { IBanner } from '../hooks/useBanner';
import { z } from 'zod';
import { bannerDetailSchema } from '../utils/zod/bannerSchema';

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
  productId?: bigint;
  linkUrl?: string;
  linkType?: string;
  bannerImage?: File | null;
  iconImage?: File | null;
}

export type IBannerDetail = z.infer<typeof bannerDetailSchema>;

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
  // 배너 조회
  getBanner: async (): Promise<IBanner[]> => {
    const response = await fetchWithAuth(`${BASE_URL}${BannerApis.createBanner}`);

    if (!response.ok) {
      throw new Error('배너 조회에 실패했습니다');
    }

    const data: IBanner[] = await response.json();
    return data;
  },
  // 배너 상세 조회
  getBannerDetail: async (id: string): Promise<IBannerDetail> => {
    const response = await fetchWithAuth(`${BASE_URL}${BannerApis.createBanner}/${id}`);

    if (!response.ok) {
      throw new Error('배너 조회에 실패했습니다');
    }

    const data: IBannerDetail = await response.json();
    return data;
  },
  // 배너 삭제
  deleteBanner: async (id: string) => {
    const response = await fetchWithAuth(`${BASE_URL}${BannerApis.createBanner}/${id}`, {
      method: 'DELETE',
    });

    console.log(response);
    if (!response.ok) {
      throw new Error('배너 삭제에 실패했습니다');
    }

    const data = await response.json();
    return data;
  },
  // 배너 수정
  updateBanner: async (data: FormData) => {
    console.log(data);
    const response = await fetchWithAuth(`${BASE_URL}${BannerApis.createBanner}/${data.get('id')}`, {
      method: 'PUT',
      body: data,
    });

    if (!response.ok) {
      throw new Error('배너 수정에 실패했습니다.');
    }

    return response.json();
  },
};
