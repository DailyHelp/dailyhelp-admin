'use client';
import React from 'react';
import SearchIcon from '@/assets/search-icon.svg';
import Input from '@/components/ui/Input';

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
    <div className={`relative inline-block rounded-xl px-3 bg-[#F9F9FB] ${className ?? ''}`}>
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="appearance-none text-[#3B4152] focus:outline-none focus:ring-none py-2 pl-5 font-bold bg-transparent border-none"
      />
    </div>
  );
}
