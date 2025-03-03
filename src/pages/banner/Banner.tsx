import { useNavigate } from 'react-router-dom';
import { PAGE_ROUTE } from '../../utils/route';
import { dummy } from '../../services/mocking';

export default function Banner() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate(PAGE_ROUTE.BANNER_REGISTER);
  };

  const handleListClick = (id: number) => {
    navigate(`${PAGE_ROUTE.BANNER}/${id}`);
  };

  return (
    <div className="flex flex-col gap-5 p-8 w-full items-end">
      <button
        onClick={handleRegisterClick}
        className="w-[100px] mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
      >
        배너 등록
      </button>
      <div className="w-full p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">배너 리스트</h2>
        <ul className="w-full divide-gray-300">
          <li className="p-4 rounded-md flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-600 w-1/4">타이틀</span>
            <span className="text-xs font-semibold text-gray-600 w-1/4">타입</span>
            <span className="text-xs font-semibold text-gray-600 w-1/4">시작일</span>
            <span className="text-xs font-semibold text-gray-600 w-1/4">종료일</span>
          </li>
          {dummy.map((banner) => (
            <li
              key={banner.id}
              onClick={() => handleListClick(banner.id)}
              className="p-4 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-200 "
            >
              <span className="text-sm text-gray-600 font-medium w-1/4 truncate">{banner.title}</span>
              <span className="text-sm text-gray-600 w-1/4">{banner.bannerType}</span>
              <span className="text-sm text-gray-500 w-1/4">{new Date(banner.startDate).toLocaleDateString()}</span>
              <span className="text-sm text-gray-500 w-1/4">{new Date(banner.endDate).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
