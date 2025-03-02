import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../api/category';

const CATEGORY_QUERY_KEY = 'category' as const;

export const useGetCategory = () => {
  return useQuery({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: () => categoryApi.getCategory(),
  });
};
