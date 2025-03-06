import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard';

const DASHBOARD_QUERY_KEY = 'dashboard' as const;

export const useGetDashboard = (keyword = '') => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, keyword],
    queryFn: () => dashboardApi.getDashboard(keyword),
  });
};
