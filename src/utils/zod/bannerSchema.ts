import * as z from 'zod';
import { BANNER_TYPE } from '../../api/banner';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 19); // 'YYYY-MM-DDTHH:mm:ss' 형식으로 변환
};

export const bannerFormSchema = z.object({
  type: z.enum([BANNER_TYPE.PRODUCT, BANNER_TYPE.EVENT], {
    required_error: '배너 타입은 필수입니다',
  }),
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  bannerOrder: z.coerce.number().min(1, '배너 순서는 필수입니다'),
  startDate: z.string().transform(formatDate),
  endDate: z.string().transform(formatDate),
  productId: z.coerce.bigint().optional(), // BigInt로 변환
  linkUrl: z.string().optional(),
});

export const bannerDetailSchema = z.object({
  id: z.number().min(1, 'ID must be a positive number'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  bannerOrder: z.number().min(0, 'Banner order must be a positive number'),
  iconUrl: z.string().url('Invalid URL format'),
  bannerImageUrl: z.string().url('Invalid URL format'),
  bannerType: z.enum(['PRODUCT', 'CATEGORY', 'EVENT']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  createdAt: z.string().min(1, 'Created date is required'),
  updatedAt: z.string().min(1, 'Updated date is required'),
  isDeleted: z.boolean(),
  productBannerResponse: z.object({
    id: z.number().min(1, 'Product Banner ID must be a positive number'),
    linkUrl: z.string().url('Invalid URL format'),
    linkType: z.string().min(1, 'Link type is required'),
    productId: z.number().min(0, 'Product ID must be a positive number'),
  }),
});
