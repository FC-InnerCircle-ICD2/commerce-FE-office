import { useState } from 'react';
import { useGetOrder } from '../../hooks/order/useOrder';
import Pagination from '../product/Pagination';

export default function Order() {
  const [page, setPage] = useState<number>(0);
  const pageSize = 10;
  const { data } = useGetOrder(page, pageSize);

  const totalPages = Math.ceil(data?.page.totalElements ? data.page.totalElements / 10 : 1);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className="flex flex-col gap-5 p-8 w-full items-center">
      <ul className="w-full divide-gray-300">
        <li className="p-4 rounded-md flex justify-between items-center">
          <span className="text-xs font-semibold text-gray-600 w-1/4 text-center">주문일</span>
          <span className="text-xs font-semibold text-gray-600 w-1/4 text-center">주문 상태</span>
          <span className="text-xs font-semibold text-gray-600 w-1/4 text-center">결제 수단</span>
          <span className="text-xs font-semibold text-gray-600 w-1/4 text-center">금액</span>
        </li>
        {data?.content.map((item, i) => {
          return (
            <li key={i} className="p-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-200 ">
              <span className="text-sm text-gray-600 text-center font-medium w-1/4 truncate">{item.orderAt}</span>
              <span className="text-sm text-gray-600 text-center w-1/4">{item.orderStatus}</span>
              <span className="text-sm text-gray-500 text-center w-1/4">{item.paymentMethod}</span>
              <span className="text-sm text-gray-500 w-1/4 text-center">{item.totalPrice}</span>
            </li>
          );
        })}
      </ul>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
