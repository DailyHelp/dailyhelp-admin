'use client';
import React from 'react';
import Image from 'next/image';
import SearchIcon from '@/assets/search-icon.svg';

export interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: SearchInputProps) {
  return (
    <div
      className={`relative inline-flex items-center gap-2 rounded-xl border border-[#D6DBE7] bg-white px-3 ${className ?? ''}`}
    >
      {typeof SearchIcon === 'string' ? (
        <Image src={SearchIcon} alt="Search" width={16} height={16} />
      ) : (
        <SearchIcon className=" text-[#99A1B3]" />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-9 w-full appearance-none border-none bg-transparent text-sm font-medium text-[#3B4152] placeholder:text-[#A9AFC2] focus:outline-none focus:ring-0"
      />
    </div>
  );
}
