interface PaginationProps {
  currentPage: number; // 0-based
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10; // 한 번에 보여줄 페이지 번호 개수

    // 시작과 끝 페이지 계산
    let startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    // startPage 재조정
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    // 첫 페이지
    if (startPage > 0) {
      pages.push(
        <button
          key="first"
          onClick={() => onPageChange(0)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          1
        </button>,
      );
      if (startPage > 1) pages.push(<span key="dots-1">...</span>);
    }

    // 페이지 번호들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded border ${
            i === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-100'
          }`}
        >
          {i + 1}
        </button>,
      );
    }

    // 마지막 페이지
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) pages.push(<span key="dots-2">...</span>);
      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages - 1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
      >
        이전
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
      >
        다음
      </button>
    </div>
  );
}
