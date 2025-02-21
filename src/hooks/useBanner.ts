import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bannerApi } from '../api/banner';
import { toast } from 'react-toastify';

const BANNER_QUERY_KEY = 'banner' as const;

export const useCreateBanner = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bannerApi.createBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BANNER_QUERY_KEY] });
      toast.success('배너가 등록되었습니다.');
      onSuccess?.();
    },
    onError: () => {
      toast.error('배너 등록에 실패했습니다.');
    },
  });
};
