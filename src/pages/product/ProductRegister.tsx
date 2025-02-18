import { useState, ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE } from '../../utils/route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateProduct } from '../../hooks/useProducts';

const formSchema = z.object({
  name: z.string().min(1, '상품명은 필수입니다'),
  description: z.string().min(1, '상품 설명은 필수입니다'),
  price: z.string().min(1, '가격은 필수입니다'),
  providerId: z.string().min(1, '공급자 ID는 필수입니다'),
  categoryId: z.string().min(1, '카테고리 ID는 필수입니다'),
  options: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema> & {
  mainImage: File | null;
  detailImages: File[];
};

export default function ProductRegister() {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [detailImages, setDetailImages] = useState<File[]>([]);


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      providerId: '',
      categoryId: '',
      options: '',
      mainImage: null,
      detailImages: [],
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'mainImage' | 'detailImages') => {
    const files = e.target.files;
    if (!files) return;

    if (field === 'mainImage') {
      setMainImage(files[0]);
    } else {
      setDetailImages(Array.from(files));
    }
  };

  const navigate = useNavigate();

  const { mutate: createProductMutation, isPending } = useCreateProduct();

  const onSuccess = () => {
    navigate(PAGE_ROUTE.PRODUCT);
  };

  const onSubmit = (values: ProductFormValues) => {
    createProductMutation(
      {
        ...values,
        mainImage,
        detailImages,
      },
      { onSuccess }
    );
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            상품명
          </label>
          <input
            id="name"
            {...form.register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="상품명을 입력해주세요"
          />
          {form.formState.errors.name && <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            상품 설명
          </label>
          <textarea
            id="description"
            {...form.register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-32"
            placeholder="상품 설명을 입력해주세요"
          />
          {form.formState.errors.description && (
            <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            가격
          </label>
          <input
            id="price"
            type="number"
            {...form.register('price')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="가격을 입력해주세요"
          />
          {form.formState.errors.price && <p className="text-sm text-red-600">{form.formState.errors.price.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="providerId" className="block text-sm font-medium text-gray-700">
            공급자 ID
          </label>
          <input
            id="providerId"
            {...form.register('providerId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="공급자 ID를 입력해주세요"
          />
          {form.formState.errors.providerId && (
            <p className="text-sm text-red-600">{form.formState.errors.providerId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            카테고리 ID
          </label>
          <input
            id="categoryId"
            {...form.register('categoryId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="카테고리 ID를 입력해주세요"
          />
          {form.formState.errors.categoryId && (
            <p className="text-sm text-red-600">{form.formState.errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="options" className="block text-sm font-medium text-gray-700">
            옵션
          </label>
          <input
            id="options"
            {...form.register('options')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="옵션을 입력해주세요"
          />
          <p className="text-sm text-gray-500">옵션은 선택사항입니다</p>
          {form.formState.errors.options && (
            <p className="text-sm text-red-600">{form.formState.errors.options.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">
            메인 이미지
          </label>
          <input
            id="mainImage"
            type="file"
            onChange={(e) => handleFileChange(e, 'mainImage')}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="detailImages" className="block text-sm font-medium text-gray-700">
            상세 이미지
          </label>
          <input
            id="detailImages"
            type="file"
            onChange={(e) => handleFileChange(e, 'detailImages')}
            accept="image/*"
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500">여러 장의 이미지를 선택할 수 있습니다</p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? '등록 중...' : '상품 등록'}
        </button>
      </form>
    </div>
  );
}
