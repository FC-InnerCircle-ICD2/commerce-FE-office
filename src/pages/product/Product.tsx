import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE } from '../../utils/route';
import { useGetProducts, useDeleteProduct } from '../../hooks/useProducts';
import Pagination from './Pagination';
import { TrashIcon } from '@heroicons/react/24/solid';

interface Product {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  providerName: string;
  mainImageUrl: string;
}

interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface ProductResponse {
  content: Product[];
  page: Page;
}

export default function Product() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data, isLoading, error } = useGetProducts(page, pageSize);
  const deleteProduct = useDeleteProduct();

  const handleRegisterClick = () => {
    navigate(PAGE_ROUTE.PRODUCT_REGISTER);
  };

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error loading products</div>;

  const response = data as ProductResponse;
  const products = response?.content || [];
  const totalPages = Math.ceil(response.page.totalElements / 10);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleDeleteProduct = (productId: string) => {
    deleteProduct.mutate(BigInt(productId));
  };

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 목록</h1>
        <button
          onClick={handleRegisterClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        >
          상품 등록
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-4 text-gray-500">등록된 상품이 없습니다.</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상품명
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가격
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    공급사
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이미지
                  </th>
                  <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    삭제
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product: Product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-normal text-xs text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      {new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{product.providerName}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">{product.categoryName}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      <img src={product.mainImageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product.id);
                        }}
                        className="px-1 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
                      >
                        <TrashIcon className="size-6 text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  );
}
