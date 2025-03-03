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
