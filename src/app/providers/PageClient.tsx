'use client';

import { useEffect, useMemo, useState } from 'react';
import FiltersBar from '@/components/providers/FiltersBar';
import UsersTable, {
  ProvidersTableRow,
  ProvidersTableSortConfig,
} from '@/components/providers/UsersTable';
import UsersPagination from '@/components/providers/UsersPagination';
import { useAdminProviders } from '@/features/providers/hooks';
import type { AdminProviderStatus } from '@/features/providers/types';
import { useSelectedProviderStore } from '@/features/providers/store';

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
  const [sortConfig, setSortConfig] = useState<ProvidersTableSortConfig>({
    key: null,
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 9;
  const debouncedSearch = useDebouncedValue(search, 400);
  const setSelectedProvider = useSelectedProviderStore((state) => state.setSelectedProvider);

  const { data, isLoading, isFetching, error } = useAdminProviders({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    status: status ? (status as AdminProviderStatus) : undefined,
  });

  const providers = useMemo(() => data?.data ?? [], [data]);
  const pagination = data?.pagination;
  const totalItems = pagination?.total ?? 0;
  const totalPages =
    pagination && typeof pagination.pages === 'number' && pagination.pages > 0
      ? pagination.pages
      : 1;

  useEffect(() => {
    if (!pagination?.pages) {
      return;
    }
    if (currentPage > pagination.pages) {
      setCurrentPage(Math.max(1, pagination.pages));
    }
  }, [pagination?.pages, currentPage]);

  const rows: ProvidersTableRow[] = useMemo(() => {
    const mapped = providers.map((provider) => {
      const fullName = [provider.firstname, provider.lastname].filter(Boolean).join(' ');
      const displayName = fullName || provider.email || 'Unknown provider';
      const category =
        provider.serviceCategory ?? provider.category ?? provider.primaryCategory ?? provider.tier ?? null;

      return {
        id: provider.uuid,
        name: displayName,
        email: provider.email ?? '—',
        phone: provider.phone,
        category,
        createdAt: provider.createdAt,
        status: provider.status ?? 'UNVERIFIED',
        picture: provider.picture,
        provider,
      };
    });

    if (!sortConfig.key) {
      return mapped;
    }

    const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;
    const key = sortConfig.key;

    const valueOf = (item: ProvidersTableRow) => {
      switch (key) {
        case 'name':
          return item.name.toLowerCase();
        case 'email':
          return item.email.toLowerCase();
        case 'phone':
          return (item.phone ?? '').toLowerCase();
        case 'category':
          return (item.category ?? '').toLowerCase();
        case 'status':
          return String(item.status ?? '').toLowerCase();
        case 'createdAt':
          return item.createdAt ?? '';
        default:
          return '';
      }
    };

    return [...mapped].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' }) * directionMultiplier;
    });
  }, [providers, sortConfig]);

  const isEmpty = !isLoading && rows.length === 0;

  const headingSubtitle = (() => {
    if (isLoading && !data) {
      return 'Loading service providers...';
    }
    return `${totalItems.toLocaleString('en-US')} Service Providers`;
  })();

  const handleSortChange = (config: ProvidersTableSortConfig) => {
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
              Unable to load service providers. {error.message}
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
                    if (row.provider) {
                      setSelectedProvider(row.provider);
                    } else {
                      setSelectedProvider(null);
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
