'use client';
import React from 'react';
import StatusBadge from './StatusBadge';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from 'lucide-react'; // icons
import type { ProviderProfile, SortConfig, ProviderSortKey } from '@/types/types';
import Button from '@/components/ui/Button';

export type ProvidersTableSortConfig = SortConfig<ProviderSortKey>;

export interface ProvidersUsersTableProps {
  data: ProviderProfile[];
  onSortChange: (cfg: ProvidersTableSortConfig) => void;
  sortConfig: ProvidersTableSortConfig;
}

export default function UsersTable({ data, onSortChange, sortConfig }: ProvidersUsersTableProps) {
  const router = useRouter();
  const getSortIcon = (columnKey: ProviderSortKey) => {
    if (sortConfig.key !== columnKey)
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    return sortConfig.direction === 'asc' ? (
      <ChevronsUpDown size={16} />
    ) : (
      <ChevronsUpDown size={16} />
    );
  };

  const handleSort = (columnKey: ProviderSortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key: columnKey, direction });
  };

  return (
    <div className="mx-4 overflow-x-auto">
      <table className="w-full min-w-[720px] text-left border-collapse" role="table" aria-label="Providers table">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]">
          <tr>
            <th className="px-6 py-3   cursor-pointer" onClick={() => handleSort('name')}>
              <span className="flex items-center gap-2">Name {getSortIcon('name')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('email')}>
              <span className="flex items-center gap-2"> Email Address {getSortIcon('email')}</span>
            </th>
            <th className="px-6 py-3  cursor-pointer" onClick={() => handleSort('category')}>
              <span className="flex items-center gap-2"> Category {getSortIcon('category')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('phone')}>
              <span className="flex items-center gap-2">Phone Number {getSortIcon('phone')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('dob')}>
              <span className="flex items-center gap-2">Date Joined {getSortIcon('dob')}</span>
            </th>
            <th className="px-6 py-3 cursor-pointer" onClick={() => handleSort('status')}>
              <span className="flex items-center gap-2">Status {getSortIcon('status')}</span>
            </th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((user) => (
            <tr key={user.id} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-6 text-[#3B4152] flex items-center gap-3">
                {(() => {
                  const AvatarComp = user.avatar as unknown as React.ComponentType<
                    React.SVGProps<SVGSVGElement>
                  >;
                  return <AvatarComp className="rounded-full w-10 h-10 center" />;
                })()}
                <span className="">{user.name}</span>
              </td>
              <td className="px-4 py-2 text-[#3B4152]">{user.email}</td>
              <td className="px-4 py-2 text-[#3B4152]">{user.category}</td>
              <td className="px-4 py-2 text-[#3B4152]">{user.phone}</td>
              <td className="px-4 py-2 text-[#3B4152]">{user.dob}</td>
              <td className="px-4 py-2">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-4 py-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push(`/providers/${user.id}`)}
                  className="!bg-transparent !border-0 w-full text-sm text-[#017441] font-medium underline cursor-pointer"
                >
                  View profile
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
