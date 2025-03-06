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

function SectionList({ sections, isLoading }: { sections: Section<SectionData>[]; isLoading: boolean }) {
  if (isLoading) {
    return <div className="text-center p-8">데이터를 불러오는 중...</div>;
  }

  if (sections.every((section) => section.data.length === 0)) {
    return <div className="text-center p-8">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => {
        if (section.data.length === 0) return null;

        return (
          <section key={section.title} className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">{section.title}</h2>
            <div className="space-y-4">
              {section.data.map((item) => (
                <div key={getItemId(item)} className="p-4 border rounded shadow-sm hover:shadow-md transition">
                  <p className="text-gray-500 text-sm font-medium">ID: {getItemId(item)}</p>
                  <p className="mt-2 text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: item.highlight }} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
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
        <SectionList sections={sections} isLoading={isLoading && query !== ''} />
      )}
    </div>
  );
}
