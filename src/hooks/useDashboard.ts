import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard';

const DASHBOARD_QUERY_KEY = 'dashboard' as const;

export const useGetDashboard = () => {
  return useQuery({
    queryKey: [DASHBOARD_QUERY_KEY],
    queryFn: () => dashboardApi.getDashboard(),
  });
};
