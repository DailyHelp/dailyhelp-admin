'use client';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface ProvidersPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  isLoading = false,
}: ProvidersPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);
  const rangeText = (() => {
    if (isLoading) {
      return 'Fetching providers...';
    }
    if (totalItems === 0) {
      return 'Showing 0 results';
    }
    return `Showing results ${startIndex}–${endIndex} of ${totalItems.toLocaleString('en-US')}`;
  })();

  return (
    <div className="flex items-center py-6 pl-8 text-sm text-gray-600  w-full">
      {/* Page controls */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1 || isLoading}
          variant="secondary"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <span className="rounded-xl border py-2 px-[15px] bg-[#F3FCF4] border-[#017441] text-[#017441]">
          {currentPage}
        </span>

        {safeTotalPages >= 2 && <MoreHorizontal className="w-5 h-5 text-gray-600" />}

        <Button
          onClick={() => {
            if (currentPage < safeTotalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === safeTotalPages || isLoading}
          variant="secondary"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Count display */}
      <p className="text-sm text-gray-500">{rangeText}</p>
    </div>
  );
}
