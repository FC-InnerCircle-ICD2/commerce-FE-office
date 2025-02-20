import * as z from 'zod';
import { BANNER_TYPE } from '../../api/banner';

export const bannerFormSchema = z.object({
  type: z.enum([BANNER_TYPE.PRODUCT, BANNER_TYPE.EVENT], {
    required_error: '배너 타입은 필수입니다',
  }),
  title: z.string().min(1, '제목은 필수입니다'),
  description: z.string().min(1, '설명은 필수입니다'),
  bannerOrder: z.coerce.number().min(1, '배너 순서는 필수입니다'),
  startDate: z.string().min(1, '시작 일시는 필수입니다'),
  endDate: z.string().min(1, '종료 일시는 필수입니다'),
  productId: z.number().optional(),
  linkUrl: z.string().optional(),
});
