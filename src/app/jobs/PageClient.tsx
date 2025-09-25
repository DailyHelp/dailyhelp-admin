'use client';
import { jobsDataDetails } from '@/data/jobsDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/jobs/JobsFiltersBar';
import JobsTable from '@/components/jobs/JobsTable';
import UsersPagination from '@/components/jobs/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import ChatView from '@/components/jobs/ChatView';
import JobDetails from '@/components/jobs/JobDetails';
import type { JobItem, SortConfig, JobSortKey, ChatThread } from '@/types/types';

export default function JobsPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatThread[] | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });

  const jobsData = useMemo<JobItem[]>(() => jobsDataDetails ?? [], []);
  const hasJobs = jobsData.length > 0;

  // --- Job filtering ---
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // 1. Filtering
  const filteredJobs = useMemo<JobItem[]>(() => {
    const q = search.toLowerCase();
    return jobsData.filter((job) => {
      const matchesSearch = job.jobId.toLowerCase().includes(q);
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [jobsData, search, statusFilter]);

  // 2. Sorting
  const sortedData = useMemo<JobItem[]>(() => {
    if (!sortConfig.key) return filteredJobs;
    const key = sortConfig.key;
    const dir = sortConfig.direction;
    const toNum = (v: string | undefined) => Number((v || '').replace(/[^\d]/g, '')) || 0;
    const cmp = (a: string | undefined, b: string | undefined) =>
      (a || '').localeCompare(b || '', undefined, { numeric: true, sensitivity: 'base' });
    return [...filteredJobs].sort((a, b) => {
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
  }, [filteredJobs, sortConfig]);

  // 3. Reset page when filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortConfig]);

  // 4. Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="py-6 space-y-4">
      {/* Job Details Modal */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            jobs={selectedJob}
            onSuccess={() => setOpenJob(false)}
            onOpenChat={(chat) => {
              setSelectedChat(chat || null);
              setOpenJob(false); // close job modal
              setOpenChat(true); // open chat modal
            }}
          />
        )}
      </SlideOverModal>

      {/* Chat Modal */}
      <SlideOverModal open={openChat} onOpenChange={setOpenChat} title="Chat">
        {selectedChat && selectedJob && <ChatView chat={selectedChat} job={selectedJob} />}
      </SlideOverModal>

      {/* Page Header */}
      <div className="px-6 flex items-center justify-between bg-white">
        <h1 className="font-bold text-[#3B4152]">{jobsData.length} Jobs</h1>
        <JobsFiltersBar
          status={statusFilter}
          setStatus={setStatusFilter}
          search={search}
          setSearch={setSearch}
        />
      </div>

      {/* Jobs Table */}
      {hasJobs ? (
        <>
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
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">
          No jobs found.
        </div>
      )}
    </div>
  );
}
