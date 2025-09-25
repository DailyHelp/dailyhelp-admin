'use client';
import { feedbackDataDetails } from '@/data/feedbackDummyData';
import { useState } from 'react';
import JobsTable from '@/components/feedback/JobsTable';
import UsersPagination from '@/components/feedback/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import JobDetails from '@/components/feedback/JobDetails';
import type { ChatThread } from '@/types/types';

export default function FeedbackPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const jobsData = feedbackDataDetails;

  // --- Job filtering ---
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  if (!jobsData) return <p>No jobs found</p>;

  // 4. Pagination
  const totalItems = jobsData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = jobsData.slice(startIndex, endIndex);

  return (
    <div className="py-6 space-y-4">
      {/* Job Details Modal */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails usersData={jobsData} jobs={selectedJob} onOpenModal={() => {}} />
        )}
      </SlideOverModal>

      {/* Page Header */}
      <div className="px-6 bg-white">
        <h1 className="font-bold text-[#3B4152]">{jobsData.length} Feedback</h1>
      </div>

      {/* Jobs Table */}
      <JobsTable
        jobs={paginatedData}
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
