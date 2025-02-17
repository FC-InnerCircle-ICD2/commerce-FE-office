import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import Product from './pages/product/Product';
import { PAGE_ROUTE } from './utils/route';
import Banner from './pages/banner/Banner';
import Order from './pages/order/Order';
import Login from './pages/login/Login';

function App() {
  // TODO: 추후 로그인 여부 세팅해야할 변수
  const isLogin = false;

  return (
    <Routes>
      <Route>
        <Route path={PAGE_ROUTE.LOGIN} element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute isAuthenticated={isLogin} />}>
        <Route path={PAGE_ROUTE.PRODUCT} element={<Product />} />
        <Route path={PAGE_ROUTE.BANNER} element={<Banner />} />
        <Route path={PAGE_ROUTE.ORDER} element={<Order />} />
        <Route path="*" element={<Navigate to={PAGE_ROUTE.PRODUCT} />} />
      </Route>
    </Routes>
  );
}

export default App;
