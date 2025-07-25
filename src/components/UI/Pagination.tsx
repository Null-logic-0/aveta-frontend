import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = [];
  const maxVisible = Math.min(3, totalPages);

  for (let i = 1; i <= maxVisible; i++) {
    visiblePages.push(i);
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoIosArrowBack />
      </button>

      {/* Page numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 cursor-pointer rounded ${
            page === currentPage ? "bg-[#8A38F5] text-white" : undefined
          }`}
        >
          {page}
        </button>
      ))}

      {totalPages > 3 && (
        <>
          <span className="px-2">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 cursor-pointer  rounded ${
              currentPage === totalPages ? "bg-[#8A38F5] text-white" : undefined
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
