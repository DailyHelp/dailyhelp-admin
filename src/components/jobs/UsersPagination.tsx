'use client';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface JobsPaginationProps {
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
}: JobsPaginationProps) {
  // Calculate indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-sm text-[#757C91]">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
          className="h-10 w-10 rounded-full border-[#D6DBE7] bg-white text-[#47516B]"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="rounded-full border border-[#017441] bg-[#F3FCF4] px-4 py-2 text-sm font-semibold text-[#017441]">
          {currentPage}
        </span>

        {totalPages > 1 && <MoreHorizontal className="h-5 w-5 text-[#99A1B3]" />}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="h-10 w-10 rounded-full border-[#D6DBE7] bg-white text-[#47516B]"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <p>
        Showing results {totalItems === 0 ? 0 : startIndex + 1}–{endIndex} of {totalItems}
      </p>
    </div>
  );
}
