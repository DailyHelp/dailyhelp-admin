'use client'

import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function TopCategories({data = [], title = []}, ) {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="">
      <div className="bg-[#F9F9FB] rounded-xl border border-[#F1F2F4]">
        <h2 className="text-[14px] text-[#757C91] font-semibold border-b border-[#F1F2F4] px-4 py-2">{title}</h2>
                                
         <div className='bg-white p-4'>
            <ul>
                {paginatedData.map((item, index) => (
                <li key={item.id} className="flex justify-between py-4 text-[14px] font-semibold text-[#3B4152]">
                    <p className='space-x-6'>{startIndex + index + 1} {item.category}</p>
                    
                <span className=""> {item.isCurrency
                ? `₦${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                : item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </li>
                ))}
            </ul>
        </div>      
    
     
      
       {/* Pagination Controls */}
       <div className="flex items-center  py-6 pl-[16px] text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            className="p-1 px-2  text-[#017441] cursor-pointer"
            disabled={page === 1}>
          <ChevronLeft className="w-6 h-6 " />
            
          </button>
          <span className="rounded-xl border py-2 px-[15px] bg-[#F3FCF4] border-[#017441] text-[#017441]">{page}</span>
          <span className=''><MoreHorizontal className="w-5 h-5 text-gray-600 font-bold" />
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            className="p-1 px-2 text-[#017441] cursor-pointer "
            disabled={page === totalPages}>
            <ChevronRight className="w-6 h-6" />

          </button>
        </div>
        <p className="text-sm text[#C6C8CFFF]">
          Showing results {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length}
        </p>
        </div>
      </div>
    </div>
  );
}
