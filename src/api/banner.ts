const BASE_URL = 'http://3.38.23.68:8080/api/admin/v1/banners';

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

const createFormData = (data: CreateBannerData) => {
  const formData = new FormData();

  // Form fields
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') return;

    // Handle files separately
    if (key === 'bannerImage' || key === 'iconImage') {
      if (value instanceof File) {
        formData.append(key, value);
      }
      return;
    }

    // Handle dates
    if ((key === 'startDate' || key === 'endDate') && typeof value === 'string') {
      const date = new Date(value);
      formData.append(key, date.toISOString());
      return;
    }

    // Handle other fields
    formData.append(key, value.toString());
  });

  return formData;
};

export const bannerApi = {
  // 배너 등록
  createBanner: async (data: CreateBannerData) => {
    const formData = createFormData(data);
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('배너 등록에 실패했습니다');
    }

    return response.json();
  },
};
