'use client';

import { useState } from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';
import Button from '@/components/ui/Button';

const DEFAULT_ITEMS_PER_PAGE = 6;

export interface TopCategoriesItem {
  id?: number | string;
  label: string;
  value: number;
  isCurrency?: boolean;
}

export interface TopCategoriesProps {
  data?: TopCategoriesItem[];
  title?: string;
  page?: number;
  totalCount?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  valuePrefix?: string;
  valueSuffix?: string;
  isLoading?: boolean;
}

export default function TopCategories({
  data = [],
  title = '',
  page,
  totalCount,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  onPageChange,
  valuePrefix = '',
  valueSuffix = '',
  isLoading = false,
}: TopCategoriesProps) {
  const isControlled =
    typeof onPageChange === 'function' && typeof page === 'number' && typeof totalCount === 'number';
  const [internalPage, setInternalPage] = useState(1);
  const currentPage = isControlled ? page! : internalPage;
  const totalItems = isControlled ? totalCount! : data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const displayData = isControlled ? data : data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    if (isControlled) {
      onPageChange?.(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  return (
    <div className="relative">
      <div
        className={`bg-[#F9F9FB] rounded-xl border border-[#F1F2F4] ${
          isLoading ? 'opacity-70' : ''
        }`}
      >
        <h2 className="text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">
          {title}
        </h2>

        <div className="bg-white p-4">
          {displayData.length === 0 && !isLoading ? (
            <p className="py-6 text-center text-sm font-semibold text-[#757C91]">No data available</p>
          ) : (
            <ul className="space-y-2">
              {displayData.map((item, index) => (
                <li
                  key={item.id ?? index}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-[14px] font-semibold text-[#3B4152] hover:bg-[#F9F9FB]"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3FCF4] text-xs font-semibold text-[#017441]">
                      {startIndex + index + 1}
                    </span>
                    <p className="text-[#3B4152] font-semibold">{item.label}</p>
                  </div>

                  <span className="text-right text-[#121921]">
                    {(() => {
                      const numericValue = Number(item.value ?? 0);
                      const prefix = (item.isCurrency ? valuePrefix || '₦' : valuePrefix)?.trim();
                      const suffix = valueSuffix.trim();
                      const formatted = Number.isFinite(numericValue)
                        ? numericValue.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })
                        : '0';

                      return `${prefix ? `${prefix} ` : ''}${formatted}${suffix ? ` ${suffix}` : ''}`;
                    })()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center  py-6 pl-[16px] text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="secondary"
            >
              <ChevronLeft className="w-6 h-6 " />
            </Button>
            <span className="rounded-xl border py-2 px-[15px] bg-[#F3FCF4] border-[#017441] text-[#017441]">
              {currentPage}
            </span>
            {totalPages > 1 && (
              <span className="">
                <MoreHorizontal className="w-5 h-5 text-gray-600 font-bold" />
              </span>
            )}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="secondary"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-sm text[#C6C8CFFF]">
            Showing results {totalItems === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems}
          </p>
        </div>
      </div>
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#017441] border-t-transparent" />
        </div>
      )}
    </div>
  );
}
