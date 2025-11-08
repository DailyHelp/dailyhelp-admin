'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronsUpDown } from 'lucide-react';
import StatusBadge from '@/components/users/StatusBadge';
import Button from '@/components/ui/Button';
import type { SortConfig, ProviderSortKey } from '@/types/types';
import type { AdminProvider, AdminProviderStatus } from '@/features/providers/types';

export type ProvidersTableSortConfig = SortConfig<ProviderSortKey>;

export interface ProvidersTableRow {
  id: string;
  name: string;
  email: string;
  category?: string | null;
  phone?: string | null;
  createdAt?: string | null;
  status?: AdminProviderStatus | string | null;
  picture?: string | null;
  provider?: AdminProvider;
  isPlaceholder?: boolean;
}

export interface ProvidersUsersTableProps {
  data: ProvidersTableRow[];
  onSortChange: (cfg: ProvidersTableSortConfig) => void;
  sortConfig: ProvidersTableSortConfig;
  isLoading?: boolean;
  isEmpty?: boolean;
  onViewProfile?: (row: ProvidersTableRow) => void;
}

function getInitials(name: string): string {
  const parts = name.split(' ').filter(Boolean);
  if (parts.length === 0) {
    return 'P';
  }
  if (parts.length === 1) {
    return parts[0][0]?.toUpperCase() ?? 'P';
  }
  return `${parts[0][0] ?? ''}${parts[parts.length - 1][0] ?? ''}`.toUpperCase();
}

function formatDate(input?: string | null): string {
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

function Avatar({ name, picture }: { name: string; picture?: string | null }) {
  if (picture) {
    return (
      <img
        src={picture}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    );
  }

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
}: ProvidersUsersTableProps) {
  const router = useRouter();

  const getSortIcon = (columnKey: ProviderSortKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={16} className="text-[#C0C5D6]" />;
    }
    return <ChevronsUpDown size={16} className="text-[#017441]" />;
  };

  const handleSort = (columnKey: ProviderSortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSortChange({ key: columnKey, direction });
  };

  const skeletonRowCount = data.length > 0 ? data.length : 6;
  const rows: ProvidersTableRow[] = isLoading
    ? Array.from({ length: skeletonRowCount }).map((_, index) => ({
        id: `skeleton-${index}`,
        name: '',
        email: '',
        phone: '',
        category: '',
        createdAt: '',
        status: 'UNVERIFIED',
        isPlaceholder: true,
      }))
    : data;

  return (
    <div className="mx-4 overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left" role="table" aria-label="Providers table">
        <thead className="bg-gray-50 text-xs uppercase text-[#757C91]">
          <tr>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Name {getSortIcon('name')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('email')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Email Address {getSortIcon('email')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('category')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Category {getSortIcon('category')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('phone')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Phone Number {getSortIcon('phone')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('createdAt')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Date Joined {getSortIcon('createdAt')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                type="button"
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 text-left font-semibold text-[#47516B]"
              >
                Status {getSortIcon('status')}
              </button>
            </th>
            <th scope="col" className="px-6 py-3 text-left font-semibold text-[#47516B]">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-[#3B4152]">
          {rows.map((row) => {
            if (row.isPlaceholder) {
              return (
                <tr key={row.id} className="border-b border-[#D6DBE7]">
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
                    <span className="h-3 w-28 animate-pulse rounded bg-[#EEF2FF]" />
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
              <tr key={row.id} className="border-b border-[#D6DBE7] last:border-0">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} picture={row.picture} />
                    <span className="font-medium text-[#1E2538]">{row.name}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#47516B]">{row.email}</td>
                <td className="px-6 py-5 text-[#47516B]">{row.category || '—'}</td>
                <td className="px-6 py-5 text-[#47516B]">{row.phone || '—'}</td>
                <td className="px-6 py-5 text-[#47516B]">{formatDate(row.createdAt)}</td>
                <td className="px-6 py-5">
                  <StatusBadge status={row.status ?? 'UNVERIFIED'} />
                </td>
                <td className="px-6 py-5">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      onViewProfile?.(row);
                      router.push(`/providers/${row.id}`);
                    }}
                    className="!bg-transparent !border-0 text-sm font-medium text-[#017441] underline underline-offset-4 hover:text-[#015c3a]"
                  >
                    View profile
                  </Button>
                </td>
              </tr>
            );
          })}
          {!isLoading && isEmpty ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#757C91]">
                No service providers found for the selected filters.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
