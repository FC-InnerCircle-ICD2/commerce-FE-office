import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PAGE_ROUTE } from '../../utils/route';
import { useCreateProduct } from '../../hooks/useProducts';
import { useProductImages } from '../../hooks/product/useProductImages';
import { useProductOptions } from '../../hooks/product/useProductOptions';
import { productFormSchema } from '../../utils/zod/productSchema';
import { ProductFormValues } from '../../types/product';

export default function ProductRegister() {
  const navigate = useNavigate();
  const { mutate: createProductMutation, isPending } = useCreateProduct();
  const {
    mainImage,
    mainImagePreview,
    detailImages,
    detailImagePreviews,
    handleFileChange,
    removeDetailImage,
    removeMainImage,
  } = useProductImages();
  const {
    options,
    addOption,
    removeOption,
    addOptionDetail,
    removeOptionDetail,
    updateOptionName,
    updateOptionDetail,
  } = useProductOptions();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      providerId: '',
      categoryId: '',
      options: [],
      mainImage: null,
      detailImages: [],
    },
  });

  const onSuccess = () => {
    navigate(PAGE_ROUTE.PRODUCT);
  };

  const onSubmit = (values: ProductFormValues) => {
    createProductMutation(
      {
        ...values,
        mainImage,
        detailImages,
        options,
      },
      { onSuccess },
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
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">상품 옵션</h3>
            <button
              type="button"
              onClick={addOption}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              옵션 추가
            </button>
          </div>

          {options.map((option, optionIndex) => (
            <div key={optionIndex} className="border p-4 rounded-lg space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={option.name}
                  onChange={(e) => updateOptionName(optionIndex, e.target.value)}
                  placeholder="옵션명 (예: 색상, 용량)"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeOption(optionIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>

              <div className="space-y-2">
                {option.optionDetails.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex space-x-2 items-start">
                    <input
                      type="text"
                      value={detail.value}
                      onChange={(e) => updateOptionDetail(optionIndex, detailIndex, 'value', e.target.value)}
                      placeholder="옵션값 (예: 빨강, 128GB)"
                      className="flex-1 p-2 border rounded"
                    />
                    <div className="flex flex-col w-32">
                      <input
                        type="number"
                        value={detail.additionalPrice}
                        onChange={(e) =>
                          updateOptionDetail(optionIndex, detailIndex, 'additionalPrice', parseInt(e.target.value) || 0)
                        }
                        className="p-2 border rounded"
                      />
                      <label className="text-sm text-gray-600 mb-1">추가 가격</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOptionDetail(optionIndex, detailIndex)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOptionDetail(optionIndex)}
                  className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  옵션값 추가
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="mainImage" className="block text-sm font-medium text-gray-700">
            메인 이미지
          </label>
          <div className="flex flex-col gap-2">
            <input
              id="mainImage"
              type="file"
              onChange={(e) => handleFileChange(e, 'mainImage')}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {mainImagePreview && (
              <div className="relative w-32 h-32">
                <img
                  src={mainImagePreview}
                  alt="메인 이미지 미리보기"
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeMainImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="detailImages" className="block text-sm font-medium text-gray-700">
            상세 이미지
          </label>
          <div className="flex flex-col gap-2">
            <input
              id="detailImages"
              type="file"
              onChange={(e) => handleFileChange(e, 'detailImages')}
              accept="image/*"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="grid grid-cols-4 gap-4">
              {detailImagePreviews.map((preview, index) => (
                <div key={index} className="relative w-32 h-32">
                  <img
                    src={preview}
                    alt={`상세 이미지 ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetailImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
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
