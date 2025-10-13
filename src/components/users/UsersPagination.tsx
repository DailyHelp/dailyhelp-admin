'use client';

import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function UsersPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  isLoading = false,
}: UsersPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < safeTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const rangeText = (() => {
    if (isLoading) {
      return 'Fetching users...';
    }
    if (totalItems === 0) {
      return 'Showing 0 results';
    }
    return `Showing results ${startIndex}–${endIndex} of ${totalItems.toLocaleString('en-US')}`;
  })();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#EAECF5] px-6 py-5 text-sm text-[#47516B]">
      <p className="text-sm text-[#757C91]">{rangeText}</p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1 || isLoading}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DBE7] text-[#47516B] transition-colors hover:border-[#017441] hover:text-[#017441] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="rounded-full border border-[#017441] bg-[#F3FCF4] px-4 py-2 text-sm font-semibold text-[#017441]">
          {currentPage}
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= safeTotalPages || isLoading}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D6DBE7] text-[#47516B] transition-colors hover:border-[#017441] hover:text-[#017441] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
