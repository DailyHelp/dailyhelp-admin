'use client';
import { reportsDataDetails } from '@/data/reportsDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/reports/JobsFiltersBar';
import JobsTable from '@/components/reports/JobsTable';
import UsersPagination from '@/components/reports/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import ChatView from '@/components/reports/ChatView';
import JobDetails from '@/components/reports/JobDetails';
import Suspend from '@/components/reports/Suspend';
import Modal from '@/components/ui/Modal';

export default function ReportsPage() {
  const [openJob, setOpenJob] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openSuspend, setSuspendOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const jobsData = reportsDataDetails;

  // --- Job filtering ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSuspendClick = (user) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
    setOpenJob(false);
  };
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
            usersData={jobsData}
            jobs={selectedJob}
            onOpenChat={(chat) => {
              setSelectedChat(chat);
              setOpenChat(true);
            }}
            handleSuspendClick={handleSuspendClick}
            onOpenModal={(type) => setOpenModal(type)} // 👈 pass down
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

      <Modal open={openSuspend} onOpenChange={setSuspendOpen} title={'Resolve report'}>
        <Suspend usersData={jobsData} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      {/* Page Header */}
      <div className="px-6 flex items-center justify-between bg-white">
        <h1 className="font-bold text-[#3B4152]">{jobsData.length} Reports</h1>
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
        onOpenChat={(chat, job) => {
          setSelectedChat(chat);
          setSelectedJob(job); // 👈 make sure job context is set
          setOpenChat(true);
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
