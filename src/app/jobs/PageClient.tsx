'use client';

import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/jobs/JobsFiltersBar';
import JobsTable from '@/components/jobs/JobsTable';
import UsersPagination from '@/components/jobs/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import ChatView from '@/components/jobs/ChatView';
import JobDetails from '@/components/jobs/JobDetails';
import type { JobItem, SortConfig, JobSortKey } from '@/types/types';
import { useAdminJobs } from '@/features/jobs/hooks';
import { mapAdminJobToJobItem, mapStatusFilterToApi } from '@/features/jobs/utils';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function JobsPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [chatContext, setChatContext] = useState<{ providerUuid?: string; customerUuid?: string } | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });

  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const defaultPageSize = 9;
  const debouncedSearch = useDebouncedValue(search, 400);

  const apiStatus = statusFilter ? mapStatusFilterToApi(statusFilter) : undefined;
  const { data, isLoading, error } = useAdminJobs({
    page: currentPage,
    limit: defaultPageSize,
    status: apiStatus,
    search: debouncedSearch || undefined,
  });

  const pageSize = data?.pagination?.limit ?? defaultPageSize;
  const totalItems = data?.pagination?.total ?? 0;
  const totalPages =
    data?.pagination && typeof data.pagination.pages === 'number' && data.pagination.pages > 0
      ? data.pagination.pages
      : 1;

  const jobsData = useMemo<JobItem[]>(() => {
    return (data?.data ?? []).map(mapAdminJobToJobItem);
  }, [data]);

  const sortedJobs = useMemo<JobItem[]>(() => {
    if (!sortConfig.key) return jobsData;
    const key = sortConfig.key;
    const dir = sortConfig.direction;
    const toNum = (v: string | undefined) => Number((v || '').replace(/[^\d]/g, '')) || 0;
    const cmp = (a: string | undefined, b: string | undefined) =>
      (a || '').localeCompare(b || '', undefined, { numeric: true, sensitivity: 'base' });

    return [...jobsData].sort((a, b) => {
      let result = 0;
      switch (key) {
        case 'jobId':
          result = cmp(a.jobId, b.jobId);
          break;
        case 'client':
          result = cmp(a.client?.name, b.client?.name);
          break;
        case 'serviceProvider':
          result = cmp(a.serviceProvider?.name, b.serviceProvider?.name);
          break;
        case 'amount':
          result = toNum(a.amount) - toNum(b.amount);
          break;
        case 'startDate':
          result = cmp(a.timeline?.started?.date, b.timeline?.started?.date);
          break;
        case 'endDate':
          result = cmp(a.timeline?.ended?.date, b.timeline?.ended?.date);
          break;
        case 'status':
          result = cmp(a.status, b.status);
          break;
      }
      return dir === 'asc' ? result : -result;
    });
  }, [jobsData, sortConfig]);

  // 3. Reset page when filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!data?.pagination?.pages) {
      return;
    }
    if (currentPage > data.pagination.pages) {
      setCurrentPage(Math.max(1, data.pagination.pages));
    }
  }, [data?.pagination?.pages, currentPage]);

  const paginatedData = sortedJobs;
  const hasJobs = paginatedData.length > 0;
  const isInitialLoading = isLoading && !data;

  return (
    <div className="space-y-6 py-6">
      {/* Job Details Modal */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            jobs={selectedJob}
            onSuccess={() => setOpenJob(false)}
            onOpenChat={(job) => {
              setSelectedJob(job);
              setChatContext({
                providerUuid: job.serviceProvider?.uuid,
                customerUuid: job.client?.uuid,
              });
              setOpenJob(false);
              setOpenChat(true);
            }}
          />
        )}
      </SlideOverModal>

      {/* Chat Modal */}
      <SlideOverModal
        open={openChat}
        onOpenChange={(isOpen) => {
          setOpenChat(isOpen);
          if (!isOpen) {
            setChatContext(null);
          }
        }}
        title="Chat"
      >
        {selectedJob && (
          <ChatView
            job={selectedJob}
            providerUuid={chatContext?.providerUuid}
            customerUuid={chatContext?.customerUuid}
          />
        )}
      </SlideOverModal>

      <section className="mx-6 flex flex-col gap-6 rounded-3xl bg-white py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-base font-semibold text-[#1E2538]">
            {totalItems.toLocaleString('en-US')} Jobs
          </p>
          <JobsFiltersBar
            status={statusFilter}
            setStatus={setStatusFilter}
            search={search}
            setSearch={setSearch}
            className="w-full justify-start lg:w-auto lg:justify-end"
          />
        </div>

        {error ? (
          <div className="py-10 text-center text-sm text-[#EA3829]">
            Unable to load jobs. {error.message}
          </div>
        ) : isInitialLoading ? (
          <div className="py-10 text-center text-sm text-[#757C91]">
            Loading jobs...
          </div>
        ) : !hasJobs ? (
          <div className="py-10 text-center text-sm text-[#757C91]">
            No jobs found.
          </div>
        ) : (
          <div className="space-y-4">
            <JobsTable
              jobs={paginatedData}
              onSortChange={setSortConfig}
              sortConfig={sortConfig}
              onOpenJobDetails={(job) => {
                setSelectedJob(job);
                setOpenJob(true);
              }}
            />

            <UsersPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={pageSize}
              onPageChange={(page) => {
                if (page < 1 || page > totalPages) return;
                setCurrentPage(page);
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
