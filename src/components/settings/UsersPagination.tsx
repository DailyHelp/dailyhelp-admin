'use client';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface SettingsPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}: SettingsPaginationProps) {
  // Calculate indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex items-center py-6 pl-8 text-sm text-gray-600  w-full">
      {/* Page controls */}
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="icon"
          onClick={() => onPageChange(currentPage - 1)}
          className="!bg-transparent p-1 px-2 text-[#017441] cursor-pointer disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <span className="rounded-xl border py-2 px-[15px] bg-[#F3FCF4] border-[#017441] text-[#017441]">
          {currentPage}
        </span>

        {totalPages >= 2 && <MoreHorizontal className="w-5 h-5 text-gray-600" />}

        <Button
          type="button"
          variant="icon"
          onClick={() => onPageChange(currentPage + 1)}
          className="!bg-transparent p-1 px-2 text-[#017441] cursor-pointer disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Count display */}
      <p className="text-sm text-gray-500">
        Showing results {startIndex + 1}–{endIndex} of {totalItems}
      </p>
    </div>
  );
}
