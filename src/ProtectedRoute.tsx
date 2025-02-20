import { Navigate, Outlet, useLocation } from 'react-router';
import Layout from './layouts/Layout';
import { PAGE_ROUTE } from './utils/route';
import { useAuth } from './authContext';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
