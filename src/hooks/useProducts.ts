import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product';
import { toast } from 'react-toastify';

const PRODUCT_QUERY_KEY = 'products' as const;

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] });
      toast.success('상품이 등록되었습니다.');
    },
    onError: () => {
      toast.error('상품 등록에 실패했습니다.');
    },
  });
};
