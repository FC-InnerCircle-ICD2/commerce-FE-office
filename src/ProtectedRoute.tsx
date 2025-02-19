import { Navigate, Outlet, useLocation } from 'react-router';
import Layout from './layouts/Layout';
import { PAGE_ROUTE } from './utils/route';

type Props = {
  isAuthenticated: boolean;
};

export default function ProtectedRoute({ isAuthenticated }: Props) {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/join') {
    return isAuthenticated ? <Navigate to={PAGE_ROUTE.PRODUCT} /> : <Outlet />;
  }

  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={PAGE_ROUTE.LOGIN} />
  );
}
