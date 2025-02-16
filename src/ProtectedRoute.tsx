import { Navigate, Outlet } from 'react-router';
import Layout from './layouts/Layout';
import { PAGE_ROUTE } from './utils/route';

type Props = {
  isAuthenticated: boolean;
};

export default function ProtectedRoute({ isAuthenticated }: Props) {
  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={PAGE_ROUTE.LOGIN} />
  );
}
