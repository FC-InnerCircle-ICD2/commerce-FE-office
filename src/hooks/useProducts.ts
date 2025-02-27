import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export const useGetProducts = (pageNumber: number, pageSize: number = 10) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, pageNumber, pageSize],
    queryFn: () => productApi.getProducts(pageNumber, pageSize),
  });
};

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEY, 'detail', productId],
    queryFn: () => productApi.getProductById(productId),
    enabled: !!productId,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] });
      toast.success('상품이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('상품 삭제에 실패했습니다.');
    },
  });
};
