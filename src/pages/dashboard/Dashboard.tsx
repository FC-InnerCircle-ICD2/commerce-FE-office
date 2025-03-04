import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState('');

  // query 변화될때 검색 api 호출하든 아니면 search 값 변경에 맞춰서 검색 api 호출하게 하든 하면 될것같습니다!
  useEffect(() => {
    console.log(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="p-8 w-full">
      <form onSubmit={handleSubmit} className="w-full flex gap-2">
        <input
          className="grow h-[40px] border border-blue-400 p-2 rounded outline-none"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어 입력"
        />
        <button type="submit" className="bg-blue-400 font-bold text-sm text-white w-[60px] rounded">
          검색
        </button>
      </form>
    </div>
  );
}
