import * as z from 'zod';

export const optionDetailSchema = z.object({
  value: z.string(),
  optionOrder: z.number(),
  additionalPrice: z.number(),
});

export const productOptionSchema = z.object({
  name: z.string(),
  optionDetails: z.array(optionDetailSchema),
});

export const productFormSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다'),
  description: z.string().min(1, '상품 설명은 필수입니다'),
  price: z.string().min(1, '가격은 필수입니다'),
  providerId: z.string().min(1, '공급자 ID는 필수입니다'),
  categoryId: z.string().min(1, '카테고리 ID는 필수입니다'),
  options: z.array(productOptionSchema).optional(),
});

export const loginSchema = z.object({
  id: z.string().min(4, '아이디는 최소 4자 이상이어야 합니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});
