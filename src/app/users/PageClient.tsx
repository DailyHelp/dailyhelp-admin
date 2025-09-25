'use client';
import { useState, useMemo } from 'react';
import FiltersBar from '@/components/users/FiltersBar';
import UsersTable from '@/components/users/UsersTable';
import UsersPagination from '@/components/users/UsersPagination';
import { usersData } from '@/data/usersDummyData';
import type { UserProfile, SortConfig, UserSortKey } from '@/types/types';

export default function PageClients() {
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig<UserSortKey>>({
    key: null,
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // 1️⃣ Filter
  const filteredData = useMemo<UserProfile[]>(() => {
    const q = search.toLowerCase();
    return usersData.filter((user: UserProfile) => {
      const matchesSearch = user.name.toLowerCase().includes(q);
      const matchesStatus = status ? user.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  // 2️⃣ Sort
  const sortedData = useMemo<UserProfile[]>(() => {
    if (!sortConfig.key) return filteredData;
    const key = sortConfig.key;
    const dir = sortConfig.direction;
    return [...filteredData].sort((a, b) => {
      const av = String(a[key] ?? '');
      const bv = String(b[key] ?? '');
      const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' });
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [filteredData, sortConfig]);

  // 3️⃣ Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className=" bg-[#F9F9FB]">
      {/* Filters */}
      <div className="px-4 py-4 flex items-center justify-between bg-white">
        <h1 className="font-bold text-[#3B4152]">{usersData.length} Users</h1>
        <FiltersBar
          status={status}
          setStatus={(s: string) => setStatus(s)}
          search={search}
          setSearch={(s: string) => setSearch(s)}
        />
      </div>

      {/* Table */}
      <UsersTable data={paginatedData} onSortChange={setSortConfig} sortConfig={sortConfig} />

      {/* Pagination */}
      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(p: number) => setCurrentPage(p)}
      />
    </div>
  );
}
