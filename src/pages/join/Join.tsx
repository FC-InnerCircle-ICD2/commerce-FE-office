import { z } from 'zod';
import { signUpSchema } from '../../utils/zod/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PAGE_ROUTE } from '../../utils/route';
import { useNavigate } from 'react-router';
import { join } from '../../api/auth';

type SignUpFormInputs = z.infer<typeof signUpSchema>;

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(signUpSchema),
  });
  const nav = useNavigate();

  const onSubmit = (data: SignUpFormInputs) => {
    join(data.email, data.password, data.password, data.userName);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">회원가입</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium">이메일</label>
            <input {...register('email')} className="w-full p-2 border rounded" placeholder="이메일 입력" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block font-medium">비밀번호</label>
            <input
              {...register('password')}
              type="password"
              className="w-full p-2 border rounded"
              placeholder="비밀번호 입력"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block font-medium">이름</label>
            <input {...register('userName')} className="w-full p-2 border rounded" placeholder="이름 입력" />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
          </div>
          <div>
            <label className="block font-medium">휴대폰 번호</label>
            <input {...register('phone')} className="w-full p-2 border rounded" placeholder="01012345678" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              회원가입
            </button>
            <button
              type="button"
              onClick={() => nav(PAGE_ROUTE.LOGIN)}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
