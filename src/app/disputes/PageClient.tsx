'use client';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/disputes/JobsFiltersBar';
import JobsTable from '@/components/disputes/JobsTable';
import UsersPagination from '@/components/disputes/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import ChatView from '@/components/disputes/ChatView';
import JobDetails from '@/components/disputes/JobDetails';
import ResolutionModal from '@/components/disputes/ResolutionModal';
import Modal from '@/components/ui/Modal';
import { modalContent } from '@/components/disputes/ResolutionModal';
import type { JobItem, SortConfig, JobSortKey, ChatThread } from '@/types/types';
import { useAdminJobDisputes } from '@/features/disputes/hooks';
import {
  mapAdminJobDisputeToJobItem,
  mapDisputeStatusFilterToApi,
} from '@/features/disputes/utils';

export default function DisputesPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [openResolution, setOpenResolution] = useState<boolean>(false);

  const [modalType, setModalType] = useState<keyof typeof modalContent | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatThread[] | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const defaultPageSize = 10;
  const apiStatus = statusFilter ? mapDisputeStatusFilterToApi(statusFilter) : undefined;

  const { data, isLoading, error } = useAdminJobDisputes({
    page: currentPage,
    limit: defaultPageSize,
    status: apiStatus,
  });

  const pageSize = data?.pagination?.limit ?? defaultPageSize;
  const totalItems = data?.pagination?.total ?? 0;
  const totalPages =
    data?.pagination && typeof data.pagination.pages === 'number' && data.pagination.pages > 0
      ? data.pagination.pages
      : 1;

  const jobsData = useMemo<JobItem[]>(() => {
    return (data?.data ?? []).map(mapAdminJobDisputeToJobItem);
  }, [data]);

  const hasJobs = jobsData.length > 0;
  const config = modalType ? modalContent[modalType] : undefined;

  // --- Sorting
  const sortedData = useMemo<JobItem[]>(() => {
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
        case 'dateSubmitted':
          result = cmp(a.timeline?.submitted?.date, b.timeline?.submitted?.date);
          break;
        case 'status':
          result = cmp(a.status, b.status);
          break;
        case 'reason':
          result = cmp((a as any).reason as string, (b as any).reason as string);
          break;
        case 'startDate':
          result = cmp(a.timeline?.started?.date, b.timeline?.started?.date);
          break;
        case 'endDate':
          result = cmp(a.timeline?.ended?.date, b.timeline?.ended?.date);
          break;
      }
      return dir === 'asc' ? result : -result;
    });
  }, [jobsData, sortConfig]);

  // --- Reset pagination on filter/sort
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  useEffect(() => {
    if (!data?.pagination?.pages) {
      return;
    }
    if (currentPage > data.pagination.pages) {
      setCurrentPage(Math.max(1, data.pagination.pages));
    }
  }, [data?.pagination?.pages, currentPage]);

  // --- Pagination
  const paginatedData = sortedData;

  // --- Handlers
  const handleOpenResolution = (job: JobItem, type: keyof typeof modalContent) => {
    setSelectedJob(job);
    setModalType(type); // "chat", "escalate", "resolve"
    setOpenResolution(true);
    setOpenJob(false);
  };

  return (
    <div className="py-6 space-y-4">
      {/* Job Details Drawer */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            jobs={selectedJob}
            // 👇 trigger resolution modal from inside JobDetails
            onOpenModal={(type) => handleOpenResolution(selectedJob!, type)}
            onOpenChat={(chat) => {
              setSelectedChat(chat || null);
              setOpenChat(true);
            }}
          />
        )}
      </SlideOverModal>

      {/* Chat Drawer */}
      <SlideOverModal open={openChat} onOpenChange={setOpenChat} title="Chat">
        {selectedChat && selectedJob && <ChatView chat={selectedChat} job={selectedJob} />}
      </SlideOverModal>

      {/* Resolution Modal */}
      <Modal open={openResolution} onOpenChange={setOpenResolution} title={config?.title ?? ''}>
        {openResolution && selectedJob && (
          <ResolutionModal
            type={modalType} // "chat" | "escalate" | "resolve"
            usersData={selectedJob}
            onSuccess={() => setOpenResolution(false)}
          />
        )}
      </Modal>

      {/* Page Header */}
      <div className="px-6 flex items-center justify-between bg-white">
        <h1 className="font-bold text-[#3B4152]">
          {totalItems.toLocaleString('en-US')} Disputes
        </h1>
        <JobsFiltersBar
          status={statusFilter}
          setStatus={setStatusFilter}
        />
      </div>

      {/* Jobs Table */}
      {error ? (
        <div className="px-6 py-10 text-center text-sm text-[#EA3829]">
          Unable to load disputes. {error.message}
        </div>
      ) : isLoading && !data ? (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">Loading disputes...</div>
      ) : hasJobs ? (
        <>
          <JobsTable
            jobs={paginatedData}
            onSortChange={setSortConfig}
            sortConfig={sortConfig}
            onOpenJobDetails={(job) => {
              setSelectedJob(job);
              setOpenJob(true);
            }}
            onOpenChat={(chat, job) => {
              setSelectedChat(chat);
              setSelectedJob(job);
              setOpenChat(true);
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
        </>
      ) : (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">
          No disputes found.
        </div>
      )}
    </div>
  );
}
