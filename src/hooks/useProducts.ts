import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productApi, CreateProductData } from '../api/product';
import { toast } from 'react-toastify';
import { ProductOption } from '../types/product';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  options: ProductOption[];
  mainImage: string;
  detailImages: string[];
}

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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, { productId: bigint; data: CreateProductData }>({
    mutationFn: ({ productId, data }) => productApi.updateProduct(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] });
      toast.success('상품이 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('상품 수정에 실패했습니다.');
      console.log(error);
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
    mutationFn: async (id: bigint) => {
      await productApi.deleteProduct(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCT_QUERY_KEY] });
      console.log('상품이 삭제되었습니다.');
      toast.success('상품이 삭제되었습니다.');
    },

    onError: (error) => {
      console.error('삭제 중 오류 발생:', error);
      toast.error('상품 삭제에 실패했습니다.');
    },
  });
};
