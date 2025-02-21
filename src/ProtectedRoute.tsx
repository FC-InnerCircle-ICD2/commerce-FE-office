import { Navigate, Outlet, useLocation } from 'react-router';
import Layout from './layouts/Layout';
import { PAGE_ROUTE } from './utils/route';
import { useAuth } from './authContext';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  if (location.pathname === '/login' || location.pathname === '/join') {
    return isAuthenticated ? <Navigate to={PAGE_ROUTE.PRODUCT} /> : <Outlet />;
  }

  return isAuthenticated ? (
    <>
      <button onClick={() => logout()}>로그아웃</button>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to={PAGE_ROUTE.LOGIN} />
  );
}
