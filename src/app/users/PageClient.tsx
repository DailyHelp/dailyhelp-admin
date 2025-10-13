'use client';

import { useEffect, useMemo, useState } from 'react';
import FiltersBar from '@/components/users/FiltersBar';
import UsersTable, { UsersTableRow, UsersTableSortConfig } from '@/components/users/UsersTable';
import UsersPagination from '@/components/users/UsersPagination';
import { useAdminCustomers } from '@/features/users/hooks';
import type { AdminCustomerStatus } from '@/features/users/types';
import { useSelectedCustomerStore } from '@/features/users/store';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function PageClients() {
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<UsersTableSortConfig>({
    key: null,
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 9;
  const debouncedSearch = useDebouncedValue(search, 400);
  const setSelectedCustomer = useSelectedCustomerStore((state) => state.setSelectedCustomer);

  const { data, isLoading, isFetching, error } = useAdminCustomers({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    status: status ? (status as AdminCustomerStatus) : undefined,
  });

  const customers = useMemo(() => data?.data ?? [], [data]);
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages = pagination?.pages ?? 1;

  const rows: UsersTableRow[] = useMemo(() => {
    const mapped = customers.map((customer) => ({
      id: customer.uuid,
      name: [customer.firstname, customer.lastname].filter(Boolean).join(' ') || customer.email,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt,
      status: customer.status,
      customer,
    }));

    if (!sortConfig.key) {
      return mapped;
    }

    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    const key = sortConfig.key;

    const valueOf = (item: UsersTableRow) => {
      switch (key) {
        case 'name':
          return item.name.toLowerCase();
        case 'email':
          return item.email.toLowerCase();
        case 'phone':
          return item.phone ?? '';
        case 'createdAt':
          return item.createdAt ?? '';
        case 'status':
          return String(item.status);
        default:
          return '';
      }
    };

    return [...mapped].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' }) * direction;
    });
  }, [customers, sortConfig]);

  const isEmpty = !isLoading && rows.length === 0;

  const headingSubtitle = (() => {
    if (isLoading && !data) {
      return 'Loading users...';
    }
    return `${totalItems.toLocaleString('en-US')} Users`;
  })();

  const handleSortChange = (config: UsersTableSortConfig) => {
    setSortConfig(config);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB]">
      <div className="pb-6">
        <section className="border-b border-[#EAECF5] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAECF5] px-5 py-6">
            <div>
              <p className="text-sm font-medium text-[#757C91]">{headingSubtitle}</p>
            </div>
            <FiltersBar
              status={status}
              setStatus={handleStatusChange}
              search={search}
              setSearch={handleSearchChange}
            />
          </div>

          {error ? (
            <div className="px-8 py-12 text-center text-sm text-[#EA3829]">
              Unable to load users. {error.message}
            </div>
          ) : (
            <>
              <div className="px-5 py-6">
                <UsersTable
                  data={rows}
                  onSortChange={handleSortChange}
                  sortConfig={sortConfig}
                  isLoading={isLoading || isFetching}
                  isEmpty={isEmpty}
                  onViewProfile={(row) => {
                    if (row.customer) {
                      setSelectedCustomer(row.customer);
                    } else {
                      setSelectedCustomer(null);
                    }
                  }}
                />
              </div>
              <div className="px-5 pb-6">
                <UsersPagination
                  currentPage={currentPage}
                  totalPages={totalPages || 1}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  isLoading={isLoading || isFetching}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
