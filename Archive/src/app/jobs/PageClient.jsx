'use client';
import { jobsDataDetails } from '@/data/jobsDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/jobs/JobsFiltersBar';
import JobsTable from '@/components/jobs/JobsTable';
import UsersPagination from '@/components/jobs/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import ChatView from '@/components/jobs/ChatView';
import JobDetails from '@/components/jobs/JobDetails';

export default function JobsPage() {
  const [openJob, setOpenJob] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const jobsData = jobsDataDetails;

  // --- Job filtering ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!jobsData) return <p>No jobs found</p>;

  // 1. Filtering
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch = job.jobId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [jobsData, search, statusFilter]);

  // 2. Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredJobs;
    return [...filteredJobs].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
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
              setSelectedChat(chat);
              setOpenJob(false); // close job modal
              setOpenChat(true); // open chat modal
            }}
          />
        )}
      </SlideOverModal>

      {/* Chat Modal */}
      <SlideOverModal open={openChat} onOpenChange={setOpenChat} title="Chat">
        {selectedChat && selectedJob && (
          <ChatView
            chat={selectedChat}
            job={selectedJob} // 👈 pass full job (contains client + provider)
          />
        )}
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
      <JobsTable
        jobs={paginatedData}
        onSortChange={setSortConfig}
        sortConfig={sortConfig}
        onOpenJobDetails={(job) => {
          setSelectedJob(job);
          setOpenJob(true);
        }}
      />

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
