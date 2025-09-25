'use client';
// import { useParams } from "next/navigation";
import { providersData } from '@/data/providersDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/providers/JobsFiltersBar';
import WalletsFiltersBar from '@/components/providers/WalletsFiltersBar';
import JobsTable from '@/components/providers/JobsTable';
import WalletsTable from '@/components/providers/WalletsTable';
import UsersPagination from '@/components/providers/UsersPagination';
// import Tabs from "@/components/users/Tabs";
import ProfileHeader from '@/components/providers/ProfileHeader';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import VerificationInfo from '@/components/providers/VerificationInfoModal';
import ChatView from '@/components/providers/ChatView';
import JobDetails from '@/components/providers/JobDetails';
import Suspend from '@/components/providers/Suspend';
import Overview from '@/components/providers/Overview';
import Analytics from '@/components/providers/Analytics';

export default function ProvidersProfilePage({ id }) {
  const [open, setOpen] = useState(false);
  const [openJob, setOpenJob] = useState(false);

  const [openSuspend, setSuspendOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState(false);
  const [selectedChat, setSelectedChat] = useState(false);

  const user = providersData.find((u) => u.id.toString() === id);

  const handleSuspendClick = (user) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
  };
  // --- State for tabs ---
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'jobs', label: 'Job History' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'wallet', label: 'Wallet Balance' },
  ];
  // --- Job filtering ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  if (!user) return <p>User not found</p>;
  const jobsData = user.jobs;

  console.log(user.wallet);

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch = job.jobId.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter ? job.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [jobsData, search, statusFilter]);

  console.log(filteredJobs);

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
      {/* Profile Header */}

      <ProfileHeader
        usersData={user}
        status={user.status}
        onOpenVerfication={() => setOpen(true)}
        handleSuspendClick={handleSuspendClick}
      />
      <SlideOverModal open={open} onOpenChange={setOpen} title="Verification details">
        <VerificationInfo usersData={user} onSuccess={() => setOpen(false)} />
      </SlideOverModal>

      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            usersData={user}
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
      <SlideOverModal open={openChat} onOpenChange={setOpenChat} title="Chat">
        {selectedChat && <ChatView chat={selectedChat} jobs={selectedJob} usersData={user} />}
      </SlideOverModal>

      <Modal
        open={openSuspend}
        onOpenChange={setSuspendOpen}
        title={user?.status === 'Suspended' ? 'Reactivate Provider' : 'Suspend Provider'}
      >
        <Suspend usersData={user} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-4 mx-5 transition-colors ${
              activeTab === tab.id
                ? 'text-[#017441] font-bold border-b-2  border-[#02CA71]'
                : 'text-[#757C91] font-medium hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <Overview provider={user.overview} usersData={user} />}

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

      {activeTab === 'analytics' && <Analytics analytics={user.analytics} usersData={user} />}

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
          <UsersPagination />
        </div>
      )}
    </div>
  );
}
