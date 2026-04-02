import { buildPagination } from '../utils/pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const items = buildPagination(currentPage, totalPages);

  return (
    <div className="pagination">
      {items.map((item, index) =>
        item === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        ) : (
          <button
            key={item}
            className={`pagination-button ${item === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}

