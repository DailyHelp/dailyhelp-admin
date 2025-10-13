'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { AdminCustomer, AdminCustomerStatus } from '@/features/users/types';

export type UserTableSortKey = 'name' | 'email' | 'phone' | 'createdAt' | 'status';

export interface UsersTableSortConfig {
  key: UserTableSortKey | null;
  direction: 'asc' | 'desc';
}

export interface UsersTableRow {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: string;
  status: AdminCustomerStatus | string;
  isPlaceholder?: boolean;
  customer?: AdminCustomer;
}

export interface UsersTableProps {
  data: UsersTableRow[];
  onSortChange: (cfg: UsersTableSortConfig) => void;
  sortConfig: UsersTableSortConfig;
  isLoading?: boolean;
  isEmpty?: boolean;
  onViewProfile?: (row: UsersTableRow) => void;
}

function formatDate(input: string): string {
  if (!input) {
    return '—';
  }

  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) {
    return input;
  }

  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function getInitials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return 'U';
  }
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() ?? 'U';
  }
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F4FF] text-sm font-semibold text-[#3B4152]">
      {initials}
    </span>
  );
}

export default function UsersTable({
  data,
  onSortChange,
  sortConfig,
  isLoading = false,
  isEmpty = false,
  onViewProfile,
}: UsersTableProps) {
  const router = useRouter();

  const getSortIcon = (columnKey: UserTableSortKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    }
    return <ChevronsUpDown size={16} className="text-[#017441]" />;
  };

  const handleSort = (columnKey: UserTableSortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key: columnKey, direction });
  };

  const skeletonRowCount = data.length > 0 ? data.length : 6;
  const rows: UsersTableRow[] = isLoading
    ? Array.from({ length: skeletonRowCount }).map((_, index) => ({
        id: `skeleton-${index}`,
        name: '',
        email: '',
        phone: '',
        createdAt: '',
        status: 'UNVERIFIED',
        isPlaceholder: true,
      }))
    : data;

  return (
    <div className="overflow-hidden rounded-3xl border border-[#EAECF5]">
      <table className="w-full min-w-[800px] border-collapse text-left" role="table" aria-label="Users table">
        <thead className="bg-[#F5F6FA] text-xs font-semibold uppercase text-[#757C91]">
          <tr>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 text-left text-xs font-semibold uppercase text-[#47516B]"
              >
                Name {getSortIcon('name')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('email')}
                className="flex items-center gap-2 text-left text-xs font-semibold uppercase text-[#47516B]"
              >
                Email Address {getSortIcon('email')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('phone')}
                className="flex items-center gap-2 text-left text-xs font-semibold uppercase text-[#47516B]"
              >
                Phone Number {getSortIcon('phone')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('createdAt')}
                className="flex items-center gap-2 text-left text-xs font-semibold uppercase text-[#47516B]"
              >
                Date Joined {getSortIcon('createdAt')}
              </button>
            </th>
            <th className="px-6 py-4">
              <button
                type="button"
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 text-left text-xs font-semibold uppercase text-[#47516B]"
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase text-[#47516B]">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-[#3B4152]">
          {rows.map((row) => {
            if (row.isPlaceholder) {
              return (
                <tr key={row.id} className="border-b border-[#F0F1F6]">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 animate-pulse rounded-full bg-[#EEF2FF]" />
                      <span className="h-3 w-32 animate-pulse rounded bg-[#EEF2FF]" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="h-3 w-40 animate-pulse rounded bg-[#EEF2FF]" />
                  </td>
                  <td className="px-6 py-5">
                    <span className="h-3 w-32 animate-pulse rounded bg-[#EEF2FF]" />
                  </td>
                  <td className="px-6 py-5">
                    <span className="h-3 w-24 animate-pulse rounded bg-[#EEF2FF]" />
                  </td>
                  <td className="px-6 py-5">
                    <span className="h-6 w-20 animate-pulse rounded-full bg-[#EEF2FF]" />
                  </td>
                  <td className="px-6 py-5">
                    <span className="h-3 w-16 animate-pulse rounded bg-[#EEF2FF]" />
                  </td>
                </tr>
              );
            }

            return (
              <tr key={row.id} className="border-b border-[#F0F1F6] last:border-0">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <AvatarPlaceholder name={row.name} />
                    <span className="font-medium text-[#1E2538]">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#47516B]">{row.email}</td>
                <td className="px-6 py-5 text-[#47516B]">{row.phone || '—'}</td>
                <td className="px-6 py-5 text-[#47516B]">{formatDate(row.createdAt)}</td>
                <td className="px-6 py-5">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      onViewProfile?.(row);
                      router.push(`/users/${row.id}`);
                    }}
                    className="text-sm font-semibold text-[#017441] underline-offset-4 transition-colors hover:text-[#015c3a] hover:underline"
                  >
                    View profile
                  </button>
                </td>
              </tr>
            );
          })}
          {!isLoading && isEmpty ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-sm text-[#757C91]">
                No users found for the selected filters.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
