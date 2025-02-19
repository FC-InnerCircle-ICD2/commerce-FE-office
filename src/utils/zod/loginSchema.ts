import { z } from 'zod';

export const loginSchema = z.object({
  id: z.string().min(4, '아이디는 최소 4자 이상이어야 합니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

export const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[A-Z]/, '비밀번호에 최소 1개의 대문자가 포함되어야 합니다.')
    .regex(/[a-z]/, '비밀번호에 최소 1개의 소문자가 포함되어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 최소 1개의 숫자가 포함되어야 합니다.')
    .regex(/[\W_]/, '비밀번호에 최소 1개의 특수문자가 포함되어야 합니다.'),
  userName: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
  phone: z.string().regex(/^010\d{8}$/, "휴대폰 번호는 '010'으로 시작하는 11자리 숫자여야 합니다."),
});
