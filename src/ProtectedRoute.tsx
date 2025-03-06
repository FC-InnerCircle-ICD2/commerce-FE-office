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
      <nav className="w-full h-[50px] shadow-md flex items-center justify-end px-[10px]">
        <button className="text-xs bg-black font-bold text-white px-2 py-2 rounded" onClick={() => logout()}>
          로그아웃
        </button>
      </nav>
      <Layout>
        <Outlet />
      </Layout>
    </>
  ) : (
    <Navigate to={PAGE_ROUTE.LOGIN} />
  );
}
