import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import FormInput from '../../components/common/FormInput';

import { PAGE_ROUTE } from '../../utils/route';
import { useCreateProduct, useGetProductById, useUpdateProduct } from '../../hooks/useProducts';
import { useProductImages } from '../../hooks/product/useProductImages';
import { useProductOptions } from '../../hooks/product/useProductOptions';
import { productFormSchema } from '../../utils/zod/productSchema';
import { ProductFormValues } from '../../types/product';

interface OptionDetail {
  value: string;
  optionOrder: number;
  additionalPrice: number;
}

interface Option {
  name: string;
  optionDetails: OptionDetail[];
}

interface ProductImage {
  productImageType: string;
  fileOrder: number;
  imageUrl: string;
}

export default function ProductRegister() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const isEdit = productId !== '0';

  const { data: productData } = useGetProductById(isEdit && productId ? productId : '');

  const { mutate: createProductMutation, isPending: isCreatePending } = useCreateProduct();

  const { mutate: updateProductMutation } = useUpdateProduct();

  const {
    mainImage,
    mainImagePreview,
    setMainImagePreview,
    detailImages,
    detailImagePreviews,
    setDetailImagePreviews,
    handleFileChange,
    removeDetailImage,
    removeMainImage,
  } = useProductImages();
  const {
    options,
    setOptions,
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
      categoryId: '',
      options: [],
      mainImage: null,
      detailImages: [],
    },
  });

  useEffect(() => {
    if (productData && isEdit) {
      // 폼 데이터 설정
      form.reset({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price ? productData.price.toString() : '0',
        categoryId: String(productData.category?.id) || '',
        options: [],
        mainImage: null,
        detailImages: [],
      });

      // 옵션 데이터 설정
      if (productData.options && productData.options.length > 0) {
        const formattedOptions: Option[] = productData.options.map((option: Option) => ({
          name: option.name,
          optionDetails: option.optionDetails.map((detail: OptionDetail) => ({
            value: detail.value,
            optionOrder: detail.optionOrder,
            additionalPrice: detail.additionalPrice,
          })),
        }));
        setOptions(formattedOptions);
      } else {
        setOptions([]);
      }

      // 이미지 미리보기 설정
      const mainImageUrl = productData.images?.find(
        (image: ProductImage) => image.productImageType === 'MAIN' && image.fileOrder === 0,
      )?.imageUrl;
      if (mainImageUrl) {
        setMainImagePreview(mainImageUrl);
      }

      const detailImageUrls =
        productData.images
          ?.filter((image: ProductImage) => image.productImageType === 'DETAIL')
          ?.sort((a: ProductImage, b: ProductImage) => a.fileOrder - b.fileOrder)
          ?.map((image: ProductImage) => image.imageUrl) || [];
      if (detailImageUrls.length > 0) {
        setDetailImagePreviews(detailImageUrls);
      }
    }
  }, [productData, isEdit, form, setOptions, setMainImagePreview, setDetailImagePreviews]);

  const onSuccess = () => {
    navigate(PAGE_ROUTE.PRODUCT);
  };

  const onSubmit = (values: ProductFormValues) => {
    if (!mainImage && !isEdit) {
      toast.error('메인 이미지를 선택해주세요.');
      return;
    }

    const formData: ProductFormValues = {
      ...values,
      mainImage: mainImage || null,
      detailImages: detailImages || [],
      options: options || [],
    };

    if (isEdit) {
      const productIdBigInt = productId ? BigInt(productId) : BigInt(0);

      if (productIdBigInt) {
        updateProductMutation({ productId: productIdBigInt, data: formData });
      }
    } else {
      createProductMutation(formData, { onSuccess });
    }
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
        <FormInput
          id="name"
          label="상품명"
          register={form.register('name')}
          error={form.formState.errors.name?.message}
          placeholder="상품명을 입력해주세요"
        />

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

        <FormInput
          id="price"
          type="number"
          label="가격"
          register={form.register('price')}
          error={form.formState.errors.price?.message}
          placeholder="가격을 입력해주세요"
        />

        <FormInput
          id="categoryId"
          label="카테고리 ID"
          register={form.register('categoryId')}
          error={form.formState.errors.categoryId?.message}
          placeholder="카테고리 ID를 입력해주세요"
        />
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
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
            <div key={optionIndex} className="border rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 flex items-center justify-between border-b">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="font-medium">옵션 {optionIndex + 1}</span>
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => updateOptionName(optionIndex, e.target.value)}
                    placeholder="옵션명 (예: 색상, 용량)"
                    className="flex-1 p-2 border rounded bg-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => addOptionDetail(optionIndex)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    옵션값 추가
                  </button>
                  <button
                    type="button"
                    onClick={() => removeOption(optionIndex)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        순서
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        옵션값
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        추가 가격
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {option.optionDetails.map((detail, detailIndex) => (
                      <tr key={detailIndex} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detailIndex + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={detail.value}
                            onChange={(e) => updateOptionDetail(optionIndex, detailIndex, 'value', e.target.value)}
                            placeholder="옵션값 (예: 빨강, 128GB)"
                            className="w-full p-2 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={detail.additionalPrice}
                            onChange={(e) =>
                              updateOptionDetail(
                                optionIndex,
                                detailIndex,
                                'additionalPrice',
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-32 p-2 border rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={() => removeOptionDetail(optionIndex, detailIndex)}
                            className="text-red-600 hover:text-red-900"
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          disabled={isCreatePending}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreatePending ? '상품 수정' : '상품 등록'}
        </button>
      </form>
    </div>
  );
}
