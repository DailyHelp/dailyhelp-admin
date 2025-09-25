'use client';
import { useState, useMemo } from 'react';
import FiltersBar from '@/components/users/FiltersBar';
import UsersTable from '@/components/users/UsersTable';
import UsersPagination from '@/components/users/UsersPagination';
import { usersData } from '@/data/usersDummyData';

export default function PageClients() {
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // 1️⃣ Filter
  const filteredData = useMemo(() => {
    return usersData.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status ? user.status === status : true;
      return matchesSearch && matchesStatus;
    });
  }, [usersData, search, status]);

  // 2️⃣ Sort
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
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
        <FiltersBar status={status} setStatus={setStatus} search={search} setSearch={setSearch} />
      </div>

      {/* Table */}
      <UsersTable data={paginatedData} onSortChange={setSortConfig} sortConfig={sortConfig} />

      {/* Pagination */}
      <UsersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
