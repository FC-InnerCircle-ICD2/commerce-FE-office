import { useEffect, useState } from 'react';
import dummydata from './dummydata.json';

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

// ID를 추출하는 헬퍼 함수
const getItemId = (item: SectionData): string => {
  if ('productId' in item) return item.productId;
  if ('orderId' in item) return item.orderId;
  if ('bannerId' in item) return item.bannerId;
  if ('providerId' in item) return item.providerId;
  throw new Error('Unknown item type');
};

// 검색 폼 컴포넌트
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

// 섹션 리스트 컴포넌트
function SectionList({ sections }: { sections: Section<SectionData>[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
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
      ))}
    </div>
  );
}

// 대시보드 컴포넌트
export default function Dashboard() {
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    console.log(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  const sections: Section<SectionData>[] = [
    { title: 'Products', data: dummydata.products },
    { title: 'Orders', data: dummydata.orders },
    { title: 'Banners', data: dummydata.banners },
    { title: 'Providers', data: dummydata.providers },
  ];

  return (
    <div className="p-8 w-full">
      <SearchForm search={search} setSearch={setSearch} onSubmit={handleSubmit} />
      <SectionList sections={sections} />
    </div>
  );
}
