'use client';
import SearchIcon from '@/assets/search-icon.svg';

export default function SearchInput({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="relative inline-block rounded-xl px-3 bg-[#F9F9FB]">
      <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder} // dynamic placeholder
        value={value}
        onChange={onChange} // still reusable
        className="appearance-none text-[#3B4152] focus:outline-none focus:ring-none py-2 pl-5 font-bold"
      />
    </div>
  );
}
