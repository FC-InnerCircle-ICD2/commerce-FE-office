import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/common/FormInput';
import { useBannerImages } from '../../hooks/banner/useBannerImages';
import { bannerFormSchema } from '../../utils/zod/bannerSchema';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PAGE_ROUTE } from '../../utils/route';
import { useCreateBanner } from '../../hooks/useBanner';

import { BANNER_TYPE, BannerType, CreateBannerData } from '../../api/banner';

export default function BannerRegister() {
  const navigate = useNavigate();
  const { mutate: createBannerMutation, isPending } = useCreateBanner();
  const {
    register,
    handleSubmit: handleFormSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateBannerData>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      type: '' as BannerType,
      title: '',
      description: '',
      bannerOrder: 0,
      startDate: '',
      endDate: '',
      productId: 0,
      linkUrl: '',
      linkType: 'internal',
    },
  });

  const {
    bannerImage,
    bannerImagePreview,
    iconImage,
    iconImagePreview,
    handleFileChange: handleImageChange,
    removeBannerImage,
    removeIconImage,
  } = useBannerImages();

  const onSuccess = () => {
    navigate(PAGE_ROUTE.BANNER);
  };

  const onSubmit = (values: CreateBannerData) => {
    createBannerMutation(
      {
        ...values,
        bannerImage,
        iconImage,
        linkType: 'internal',
      },
      { onSuccess },
    );
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl mx-auto p-6">
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

      <div className="flex flex-col gap-2">
        <label className="font-medium">타입</label>
        <select
          {...register('type')}
          value={watch('type')}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">선택하세요</option>
          <option value={BANNER_TYPE.PRODUCT}>{BANNER_TYPE.PRODUCT}</option>
          <option value={BANNER_TYPE.EVENT}>{BANNER_TYPE.EVENT}</option>
        </select>
        {errors.type && <p className="text-sm text-red-600">{errors.type.message}</p>}
      </div>

      <FormInput
        label="제목"
        type="text"
        register={register('title')}
        error={errors.title?.message}
        placeholder="배너명을 입력해주세요"
      />

      <div className="flex flex-col gap-2">
        <label className="font-medium">설명</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-32"
          placeholder="배너 설명을 입력해주세요"
        />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <FormInput
        label="배너 순서"
        type="number"
        register={register('bannerOrder')}
        error={errors.bannerOrder?.message}
      />

      <FormInput
        label="시작 일시"
        type="datetime-local"
        register={register('startDate')}
        error={errors.startDate?.message}
        value={watch('startDate') ? new Date(watch('startDate')).toISOString().slice(0, 16) : ''}
      />

      <FormInput
        label="종료 일시"
        type="datetime-local"
        register={register('endDate')}
        error={errors.endDate?.message?.toString()}
        value={watch('endDate') ? new Date(watch('endDate')).toISOString().slice(0, 16) : ''}
      />

      <div className="flex flex-col gap-2">
        <label className="font-medium">아이콘 이미지</label>
        <div className="space-y-2">
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'iconImage')}
            accept="image/*"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {iconImagePreview && (
            <div className="relative w-32 h-32">
              <img src={iconImagePreview} alt="Icon preview" className="w-full h-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={removeIconImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <FormInput label="상품 ID" type="number" register={register('productId', { required: true })} />

      <FormInput label="링크 URL" type="url" register={register('linkUrl')} placeholder="배너 url을 입력해주세요" />

      {/* <div className="flex flex-col gap-2">
        <label className="font-medium">링크 타입</label>
        <select
          {...register('linkType')}
          value={watch('linkType')}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">선택하세요</option>
          <option value="INTERNAL">내부</option>
          <option value="EXTERNAL">외부</option>
        </select>
      </div> */}

      <div className="flex flex-col gap-2">
        <label className="font-medium">배너 이미지</label>
        <div className="space-y-2">
          <input
            type="file"
            onChange={(e) => handleImageChange(e, 'bannerImage')}
            accept="image/*"
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {bannerImagePreview && (
            <div className="relative w-full max-w-lg">
              <img src={bannerImagePreview} alt="Banner preview" className="w-full object-cover rounded-lg" />
              <button
                type="button"
                onClick={removeBannerImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
      >
        {isPending ? '등록 중...' : '배너 등록'}
      </button>
    </form>
  );
}
