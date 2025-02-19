import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE } from '../../utils/route';

export default function Product() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(PAGE_ROUTE.PRODUCT_REGISTER);
  };

  return (
    <main className="p-8">
      <button
        onClick={handleRegisterClick}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        상품 등록
      </button>
      {/* Product list will be implemented here */}
    </main>
  );
}
