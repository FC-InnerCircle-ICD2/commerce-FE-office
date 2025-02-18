import { useLocation, useNavigate } from 'react-router';
import { PAGE_ROUTE } from '../utils/route';

export default function Sidebar() {
  const nav = useNavigate();
  const location = useLocation();

  const checkLocationName = (path: string) => {
    if (path === PAGE_ROUTE.PRODUCT) {
      return location.pathname === path || location.pathname === PAGE_ROUTE.PRODUCT_REGISTER;
    }
    return location.pathname === path;
  };

  return (
    <ul className="p-5 flex flex-col gap-3">
      <li
        className={`w-[200px] h-[50px] flex items-center justify-center cursor-pointer ${checkLocationName(PAGE_ROUTE.PRODUCT) && 'font-bold bg-slate-200'} hover:font-bold hover:bg-slate-200`}
        onClick={() => nav(PAGE_ROUTE.PRODUCT)}
      >
        상품 관리
      </li>
      <li
        className={`w-[200px] h-[50px] flex items-center justify-center cursor-pointer ${checkLocationName(PAGE_ROUTE.ORDER) && 'font-bold bg-slate-200'} hover:font-bold hover:bg-slate-200`}
        onClick={() => nav(PAGE_ROUTE.ORDER)}
      >
        주문 관리
      </li>
      <li
        className={`w-[200px] h-[50px] flex items-center justify-center cursor-pointer ${checkLocationName(PAGE_ROUTE.BANNER) && 'font-bold bg-slate-200'} hover:font-bold hover:bg-slate-200`}
        onClick={() => nav(PAGE_ROUTE.BANNER)}
      >
        배너 관리
      </li>
    </ul>
  );
}
