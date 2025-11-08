'use client';

import { useState, useMemo, useEffect } from 'react';
import JobsTable from '@/components/feedback/JobsTable';
import UsersPagination from '@/components/feedback/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import JobDetails from '@/components/feedback/JobDetails';
import type { FeedbackListItem } from '@/types/types';
import { useAdminFeedbacks } from '@/features/feedback/hooks';
import { mapAdminFeedbackToFeedbackItem } from '@/features/feedback/utils';

export default function FeedbackPage() {
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<FeedbackListItem | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const defaultPageSize = 10;

  const { data, isLoading, error } = useAdminFeedbacks({
    page: currentPage,
    limit: defaultPageSize,
  });

  const feedbackData = useMemo<FeedbackListItem[]>(() => {
    return (data?.data ?? []).map(mapAdminFeedbackToFeedbackItem);
  }, [data]);

  const pageSize = data?.pagination?.limit ?? defaultPageSize;
  const totalItems = data?.pagination?.total ?? feedbackData.length;
  const totalPages = data?.pagination?.pages ?? Math.max(1, Math.ceil(totalItems / pageSize));
  const hasFeedback = feedbackData.length > 0;

  useEffect(() => {
    if (!data?.pagination?.pages) {
      return;
    }
    if (currentPage > data.pagination.pages) {
      setCurrentPage(Math.max(1, data.pagination.pages));
    }
  }, [data?.pagination?.pages, currentPage]);

  return (
    <div className="py-6 space-y-4">
      {/* Job Details Modal */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Feedback details">
        {selectedJob && (
          <JobDetails job={selectedJob} />
        )}
      </SlideOverModal>

      {/* Page Header */}
      <div className="px-6 bg-white">
        <h1 className="font-bold text-[#3B4152]">
          {totalItems.toLocaleString('en-US')} Feedback
        </h1>
      </div>

      {/* Jobs Table */}
      {error ? (
        <div className="px-6 py-10 text-center text-sm text-[#EA3829]">
          Unable to load feedback. {error.message}
        </div>
      ) : isLoading && !data ? (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">Loading feedback…</div>
      ) : hasFeedback ? (
        <JobsTable
          jobs={feedbackData}
          onOpenJobDetails={(job) => {
            setSelectedJob(job);
            setOpenJob(true);
          }}
        />
      ) : (
        <div className="px-6 py-10 text-center text-sm text-[#757C91]">
          No feedback submitted yet.
        </div>
      )}

      {/* Pagination */}
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
  );
}
