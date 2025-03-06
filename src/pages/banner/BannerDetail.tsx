import { z } from 'zod';
import { bannerDetailSchema } from '../../utils/zod/bannerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router';
import { useBannerDetail, useDeleteBanner, useUpdateBanner } from '../../hooks/useBanner';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PAGE_ROUTE } from '../../utils/route';
import FormInput from '../../components/common/FormInput';

type BannerFormType = z.infer<typeof bannerDetailSchema>;

export default function BannerDetail() {
  const nav = useNavigate();
  const param = useParams<{ bannerID: string }>();
  const [iconPreview, setIconPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const { bannerDetail } = useBannerDetail(param.bannerID ?? '');
  const { updateBannerMutate } = useUpdateBanner(() => nav(PAGE_ROUTE.BANNER));
  const { deleteBannerMutate } = useDeleteBanner();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BannerFormType>({
    resolver: zodResolver(bannerDetailSchema),
  });

  useEffect(() => {
    if (bannerDetail) {
      setIconPreview(bannerDetail.iconUrl as string);
      setBannerPreview(bannerDetail.bannerImageUrl as string);
      reset(bannerDetail);
    }
  }, [bannerDetail, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, field: 'iconUrl' | 'bannerImageUrl') => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (field === 'iconUrl') setIconPreview(imageUrl);
      if (field === 'bannerImageUrl') setBannerPreview(imageUrl);
      setValue(field, file);
    }
  };

  const onSubmit = (data: BannerFormType) => {
    const formData = new FormData();
    formData.append('type', data.bannerType);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('bannerOrder', String(data.bannerOrder));
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('iconImage', data.iconUrl);
    formData.append('productId', String(data.productBannerResponse.productId));
    formData.append('linkUrl', data.productBannerResponse.linkUrl);
    formData.append('linkType', data.productBannerResponse.linkType);
    formData.append('bannerImage', data.bannerImageUrl);
    updateBannerMutate({ id: data.id, data: formData });
  };

  return (
    <section className="w-full p-5">
      <div className="w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Banner Detail</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">ID</label>
            <input {...register('id')} className="w-full p-2 border rounded" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Title</label>
            <input {...register('title')} className="w-full p-2 border rounded" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea {...register('description')} className="w-full p-2 border rounded" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Banner Order</label>
            <input
              {...register('bannerOrder', { valueAsNumber: true })}
              type="number"
              className="w-full p-2 border rounded"
            />
            {errors.bannerOrder && <p className="text-red-500 text-sm">{errors.bannerOrder.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Icon Image</label>
            <div className="flex gap-4">
              {iconPreview !== '' && (
                <img src={iconPreview} alt="Icon Preview" className="w-20 h-20 object-cover rounded mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'iconUrl')}
                className="block w-full text-sm text-gray-500"
              />
              {errors.iconUrl && <p className="text-red-500 text-sm">{errors.iconUrl.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'bannerImageUrl')}
              className="block w-full text-sm text-gray-500"
            />
            {bannerPreview !== '' && (
              <img src={bannerPreview} alt="Banner Preview" className="w-full h-40 object-cover rounded mt-2" />
            )}
            {errors.bannerImageUrl && <p className="text-red-500 text-sm">{errors.bannerImageUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Is Deleted</label>
            <input type="checkbox" {...register('isDeleted')} />
            {errors.isDeleted && <p className="text-red-500 text-sm">{errors.isDeleted.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Banner Type</label>
            <input {...register('bannerType')} className="w-full p-2 border rounded" />
            {errors.bannerType && <p className="text-red-500 text-sm">{errors.bannerType.message}</p>}
          </div>

          <div>
            <FormInput
              label="Start Date"
              type="datetime-local"
              register={register('startDate')}
              error={errors.startDate?.message}
              value={watch('startDate') ? new Date(watch('startDate')).toISOString().slice(0, 16) : ''}
            />
          </div>

          <div>
            <FormInput
              label="End Date"
              type="datetime-local"
              register={register('endDate')}
              error={errors.endDate?.message?.toString()}
              value={watch('endDate') ? new Date(watch('endDate')).toISOString().slice(0, 16) : ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Created At</label>
            <input {...register('createdAt')} className="w-full p-2 border rounded" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Updated At</label>
            <input {...register('updatedAt')} className="w-full p-2 border rounded" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Product Banner ID</label>
            <input {...register('productBannerResponse.id')} className="w-full p-2 border rounded" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Product ID</label>
            <input {...register('productBannerResponse.productId')} className="w-full p-2 border rounded" disabled />
          </div>

          <div>
            <label className="block text-sm font-medium">Link Type</label>
            <input {...register('productBannerResponse.linkType')} className="w-full p-2 border rounded" />
            {errors.productBannerResponse?.linkType && (
              <p className="text-red-500 text-sm">{errors.productBannerResponse.linkType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Link URL</label>
            <input {...register('productBannerResponse.linkUrl')} className="w-full p-2 border rounded" />
            {errors.productBannerResponse?.linkUrl && (
              <p className="text-red-500 text-sm">{errors.productBannerResponse.linkUrl.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => deleteBannerMutate(String(bannerDetail?.id ?? ''))}
            >
              배너 삭제
            </button>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              배너 수정
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
