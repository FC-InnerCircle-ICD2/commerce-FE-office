import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/zod/loginSchema';
import { PAGE_ROUTE } from '../../utils/route';
import { useNavigate } from 'react-router';
import { useAuth } from '../../authContext';

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    await login(data.id, data.password);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium">아이디</label>
            <input {...register('id')} className="w-full p-2 border rounded" placeholder="아이디 입력" />
            {errors.id && <p className="text-red-500">{errors.id.message}</p>}
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
          <div className="flex flex-col gap-1">
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
              로그인
            </button>
            <button
              type="button"
              onClick={() => nav(PAGE_ROUTE.JOIN)}
              className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
