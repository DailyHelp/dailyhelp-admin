'use client';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/reports/JobsFiltersBar';
import JobsTable from '@/components/reports/JobsTable';
import UsersPagination from '@/components/reports/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import ChatView from '@/components/reports/ChatView';
import JobDetails from '@/components/reports/JobDetails';
import ResolveReportModal from '@/components/reports/ResolveReportModal';
import type { ReportEntry, SortConfig, JobSortKey } from '@/types/types';
import { useAdminReports } from '@/features/reports/hooks';
import { mapAdminReportToReportEntry, mapReportStatusFilterToApi } from '@/features/reports/utils';

export default function ReportsPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);

  const [selectedJob, setSelectedJob] = useState<ReportEntry | null>(null);
  const [chatContext, setChatContext] = useState<{ providerUuid?: string; customerUuid?: string } | null>(null);
  const [openResolveModal, setOpenResolveModal] = useState<boolean>(false);
  const [resolveTarget, setResolveTarget] = useState<ReportEntry | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const defaultPageSize = 10;
  const apiStatus = statusFilter ? mapReportStatusFilterToApi(statusFilter) : undefined;

  const { data, isLoading, error } = useAdminReports({
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

  const jobsData = useMemo<ReportEntry[]>(() => {
    return (data?.data ?? []).map(mapAdminReportToReportEntry);
  }, [data]);

  const hasJobs = jobsData.length > 0;

  // 1. Filtering
  const sortedData = useMemo<ReportEntry[]>(() => {
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
          result = cmp(a.reporter?.name, b.reporter?.name);
          break;
        case 'serviceProvider':
          result = cmp(a.reportedParty?.name, b.reportedParty?.name);
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
          result = cmp(a.reason, b.reason);
          break;
      }
      return dir === 'asc' ? result : -result;
    });
  }, [jobsData, sortConfig]);

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

  const paginatedData = sortedData;

  return (
    <div className="py-6 space-y-4">
      {/* Report Details Modal */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Report details">
        {selectedJob && (
          <JobDetails
            jobs={selectedJob}
            onRequestResolve={(report) => {
              setResolveTarget(report);
              setOpenResolveModal(true);
            }}
          />
        )}
      </SlideOverModal>

      <Modal
        open={openResolveModal}
        onOpenChange={(isOpen) => {
          setOpenResolveModal(isOpen);
          if (!isOpen) {
            setResolveTarget(null);
          }
        }}
        title="Resolve report"
      >
        {resolveTarget && (
          <ResolveReportModal
            report={resolveTarget}
            onCancel={() => setOpenResolveModal(false)}
            onResolved={() => {
              setOpenResolveModal(false);
              setResolveTarget(null);
              setOpenJob(false);
            }}
          />
        )}
      </Modal>

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
        {selectedJob && chatContext && (
          <ChatView
            job={selectedJob}
            providerUuid={chatContext.providerUuid}
            customerUuid={chatContext.customerUuid}
          />
        )}
      </SlideOverModal>

      {/* Page Header */}
      <div className="px-6 flex items-center justify-between bg-white">
        <h1 className="font-bold text-[#3B4152]">
          {totalItems.toLocaleString('en-US')} Reports
        </h1>
        <JobsFiltersBar
          status={statusFilter}
          setStatus={setStatusFilter}
        />
      </div>

      {/* Jobs Table */}
      {error ? (
        <div className="px-6 py-10 text-center text-sm text-[#EA3829]">
          Unable to load reports. {error.message}
        </div>
      ) : isLoading && !data ? (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">Loading reports...</div>
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
            onOpenChat={({ job, providerUuid, customerUuid }) => {
              setSelectedJob(job);
              setChatContext({ providerUuid, customerUuid });
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
          No reports found.
        </div>
      )}
    </div>
  );
}
