'use client';
// import { useParams } from "next/navigation";
import { usersData } from '@/data/usersDummyData';
import { useState, useMemo, useEffect } from 'react';
import type { JobItem, SortConfig, JobSortKey, UserProfile } from '@/types/types';
import JobsFiltersBar from '@/components/users/JobsFiltersBar';
import WalletsFiltersBar from '@/components/users/WalletsFiltersBar';
import JobsTable from '@/components/users/JobsTable';
import WalletsTable from '@/components/users/WalletsTable';
import UsersPagination from '@/components/users/UsersPagination';
// import Tabs from "@/components/users/Tabs";
import ProfileHeader from '@/components/users/ProfileHeader';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import VerificationInfo from '@/components/users/VerificationInfoModal';
import ChatView from '@/components/users/ChatView';
import JobDetails from '@/components/users/JobDetails';
import Suspend from '@/components/users/Suspend';
import Button from '@/components/ui/Button';

export default function UserProfilePage({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openJob, setOpenJob] = useState<boolean>(false);
  const [openSuspend, setSuspendOpen] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });
  const [selectedUsers, setSelectedUsers] = useState<UserProfile | false>(false);
  const [selectedChat, setSelectedChat] = useState<any>(false);

  const user = usersData.find((u) => u.id.toString() === id);
  const jobsData = useMemo<JobItem[]>(() => user?.jobs ?? [], [user]);

  const handleSuspendClick = (user: UserProfile) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
  };
  // --- State for tabs ---
  const [activeTab, setActiveTab] = useState('jobs');
  const tabs = [
    { id: 'jobs', label: 'Job History' },
    { id: 'wallet', label: 'Wallet Balance' },
  ];
  // --- Job filtering ---
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

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

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div className="py-6 space-y-4">
      {/* Profile Header */}

      <ProfileHeader
        usersData={user}
        status={user.status}
        onOpenVerfication={() => setOpen(true)}
        handleSuspendClick={handleSuspendClick}
      />
      <SlideOverModal open={open} onOpenChange={setOpen} title="Verification details">
        <VerificationInfo usersData={user} />
      </SlideOverModal>

      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            usersData={user}
            jobs={selectedJob}
            onOpenChat={(chat) => {
              setSelectedChat(chat);
              setOpenJob(false); // close job modal
              setOpenChat(true); // open chat modal
            }}
          />
        )}
      </SlideOverModal>
      <SlideOverModal open={openChat} onOpenChange={setOpenChat} title="Chat">
        {selectedChat && selectedJob && (
          <ChatView chat={selectedChat} jobs={selectedJob} usersData={user} />
        )}
      </SlideOverModal>

      <Modal
        open={openSuspend}
        onOpenChange={setSuspendOpen}
        title={user?.status === 'Suspended' ? 'Reactivate User' : 'Suspend User'}
      >
        <Suspend usersData={user} />
      </Modal>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant="secondary"
            className={`!bg-transparent !border-0 p-4 mx-5 transition-colors rounded-none ${
              activeTab === tab.id
                ? 'text-[#017441] font-bold border-b-2  border-[#02CA71]'
                : 'text-[#757C91] font-medium hover:text-gray-700'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'jobs' && (
        <>
          <div className="px-6  flex items-center justify-between bg-white">
            <h1 className="font-bold text-[#3B4152]">{jobsData.length} Jobs</h1>
            <JobsFiltersBar
              status={statusFilter}
              setStatus={setStatusFilter}
              search={search}
              setSearch={setSearch}
            />
          </div>

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
      )}

      {activeTab === 'wallet' && (
        <div className="space-y-2">
          <div className="px-4 space-y-2">
            <p className="text-xs  text-[#757C91]">Available balance</p>
            <div>
              {user.wallet.map((txn, idx) => (
                <p key={idx} className="text-2xl font-bold">
                  ₦{txn.balance}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center px-4 pt-2">
            <h2 className="text-[#3B4152] text-sm font-bold">Transaction history</h2>
            <WalletsFiltersBar />
          </div>

          <WalletsTable wallet={user.wallet} />
          <UsersPagination
            currentPage={1}
            totalPages={1}
            totalItems={user.wallet?.[0]?.transactions?.length ?? 0}
            itemsPerPage={user.wallet?.[0]?.transactions?.length ?? 0}
            onPageChange={() => {}}
          />
        </div>
      )}
    </div>
  );
}
