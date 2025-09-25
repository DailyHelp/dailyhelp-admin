'use client';
import { disputesDataDetails } from '@/data/disputesDummyData';
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

export default function DisputesPage() {
  const [openJob, setOpenJob] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openResolution, setOpenResolution] = useState(false);

  const [modalType, setModalType] = useState(null); // "chat" | "escalate" | "resolve"
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const jobsData = disputesDataDetails;
  const itemsPerPage = 10;
  const config = modalContent[modalType] || {};

  if (!jobsData) return <p>No jobs found</p>;

  // --- Filtering
  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch = job.jobId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [jobsData, search, statusFilter]);

  // --- Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredJobs;
    return [...filteredJobs].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredJobs, sortConfig]);

  // --- Reset pagination on filter/sort
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortConfig]);

  // --- Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // --- Handlers
  const handleOpenResolution = (job, type) => {
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
            onOpenModal={(type) => handleOpenResolution(selectedJob, type)}
            onOpenChat={(chat) => {
              setSelectedChat(chat);
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
      <Modal open={openResolution} onOpenChange={setOpenResolution} title={config.title}>
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
        <h1 className="font-bold text-[#3B4152]">{jobsData.length} Disputes</h1>
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
          setSelectedJob(job);
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
