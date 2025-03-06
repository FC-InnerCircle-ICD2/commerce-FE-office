import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../../api/dashboard';

interface Highlightable {
  highlight: string;
}

interface Product extends Highlightable {
  productId: string;
}

interface Order extends Highlightable {
  orderId: string;
}

interface Banner extends Highlightable {
  bannerId: string;
}

interface Provider extends Highlightable {
  providerId: string;
}

type SectionData = Product | Order | Banner | Provider;

interface Section<T> {
  title: string;
  data: T[];
}

interface ApiResponse {
  products: Product[];
  orders: Order[];
  banners: Banner[];
  providers: Provider[];
}

interface PaginationState {
  [key: string]: number; // 각 섹션별 현재 페이지 (title: currentPage)
}

const getItemId = (item: SectionData): string => {
  if ('productId' in item) return item.productId;
  if ('orderId' in item) return item.orderId;
  if ('bannerId' in item) return item.bannerId;
  if ('providerId' in item) return item.providerId;
  throw new Error('Unknown item type');
};

function SearchForm({
  search,
  setSearch,
  onSubmit,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="w-full flex gap-2 mb-6 bg-white p-4 rounded shadow">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 p-2 border rounded"
        placeholder="검색어를 입력하세요..."
      />
      <button type="submit" className="p-2 px-4 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700">
        검색
      </button>
    </form>
  );
}

// 페이지네이션 컴포넌트
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  sectionTitle,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, sectionTitle: string) => void;
  sectionTitle: string;
}) {
  const getPageButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i, sectionTitle)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className="flex justify-center mt-4 mb-2 items-center">
      <button
        onClick={() => onPageChange(currentPage - 1, sectionTitle)}
        disabled={currentPage <= 1}
        className={`px-3 py-1 rounded mr-2 ${
          currentPage <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        이전
      </button>

      {getPageButtons()}

      <button
        onClick={() => onPageChange(currentPage + 1, sectionTitle)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 rounded ml-2 ${
          currentPage >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        다음
      </button>
    </div>
  );
}

// 섹션 컴포넌트
function SectionComponent({
  section,
  currentPage,
  onPageChange,
}: {
  section: Section<SectionData>;
  currentPage: number;
  onPageChange: (page: number, sectionTitle: string) => void;
}) {
  const itemsPerPage = 6;
  const totalItems = section.data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = section.data.slice(startIndex, endIndex);

  if (totalItems === 0) return null;

  return (
    <section className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        {section.title} <span className="text-sm text-gray-500">({totalItems})</span>
      </h2>

      <div className="space-y-4">
        {currentItems.map((item) => (
          <div key={getItemId(item)} className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm font-medium">ID: {getItemId(item)}</p>
            <p className="mt-2 text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: item.highlight }} />
          </div>
        ))}
      </div>

      {totalItems > itemsPerPage && (
        <>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            sectionTitle={section.title}
          />
          <div className="text-center text-gray-500 text-sm">
            {startIndex + 1}-{endIndex} / {totalItems}
          </div>
        </>
      )}
    </section>
  );
}

function SectionList({
  sections,
  isLoading,
  searchQuery,
}: {
  sections: Section<SectionData>[];
  isLoading: boolean;
  searchQuery: string;
}) {
  const [paginationState, setPaginationState] = useState<PaginationState>({});

  useEffect(() => {
    const initialPagination: PaginationState = {};
    sections.forEach((section) => {
      initialPagination[section.title] = 1;
    });
    setPaginationState(initialPagination);
  }, [sections]);

  const handlePageChange = (page: number, sectionTitle: string) => {
    setPaginationState((prev) => ({
      ...prev,
      [sectionTitle]: page,
    }));

    const sectionElement = document.getElementById(`section-${sectionTitle}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">데이터를 불러오는 중...</div>;
  }

  if (!searchQuery) {
    return <div className="text-center p-8">검색어를 입력해주세요</div>; // 검색어 입력 전 문구
  }

  if (sections.every((section) => section.data.length === 0)) {
    return <div className="text-center p-8">검색 결과가 없습니다.</div>; // 검색 결과가 없을 때 문구
  }

  const sectionsWithData = sections.filter((section) => section.data.length > 0);

  return (
    <div>
      {sectionsWithData.map((section) => (
        <div key={section.title} id={`section-${section.title}`}>
          <SectionComponent
            section={section}
            currentPage={paginationState[section.title] || 1}
            onPageChange={handlePageChange}
          />
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['dashboard', query],
    queryFn: () => dashboardApi.getDashboard(query),
    enabled: query !== '',
  });

  useEffect(() => {
    console.log('검색어:', query);
    if (error) {
      console.error('API 오류:', error);
    }
  }, [query, error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
  };

  const sections: Section<SectionData>[] = [
    { title: 'Products', data: data?.products || [] },
    { title: 'Orders', data: data?.orders || [] },
    { title: 'Banners', data: data?.banners || [] },
    { title: 'Providers', data: data?.providers || [] },
  ];

  return (
    <div className="p-8 w-full">
      <SearchForm search={search} setSearch={setSearch} onSubmit={handleSubmit} />
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          데이터를 불러오는 중 오류가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
        </div>
      ) : (
        <SectionList sections={sections} isLoading={isLoading && query !== ''} searchQuery={query} />
      )}
    </div>
  );
}
