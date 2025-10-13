'use client';

import { useState, useMemo, useEffect } from 'react';
import type { IconRef, JobItem, SortConfig, JobSortKey, UserProfile } from '@/types/types';
import JobsFiltersBar from '@/components/users/JobsFiltersBar';
import WalletsFiltersBar from '@/components/users/WalletsFiltersBar';
import JobsTable from '@/components/users/JobsTable';
import WalletTable from '@/components/users/WalletTable';
import UsersPagination from '@/components/users/UsersPagination';
// import Tabs from "@/components/users/Tabs";
import ProfileHeader from '@/components/users/ProfileHeader';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import VerificationInfo from '@/components/users/VerificationInfoModal';
import ChatView from '@/components/users/ChatView';
import JobDetails from '@/components/users/JobDetails';
import Suspend from '@/components/users/Suspend';
import { useSelectedCustomerStore } from '@/features/users/store';
import { useAdminCustomer, useAdminCustomerJobs, useCustomerWallet } from '@/features/users/hooks';
import type {
  AdminCustomer,
  AdminCustomerJob,
  AdminCustomerStatus,
} from '@/features/users/types';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const amountFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const STATUS_LABELS: Record<AdminCustomerStatus | string, string> = {
  VERIFIED: 'Verified',
  UNVERIFIED: 'Pending',
  SUSPENDED: 'Suspended',
};

function formatDate(value?: string | null): string {
  if (!value) {
    return '—';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '—';
  }

  const day = parsed.toLocaleString('en-US', { day: '2-digit' });
  const month = parsed.toLocaleString('en-US', { month: 'short' });
  const year = parsed.toLocaleString('en-US', { year: 'numeric' });
  return `${day} ${month}, ${year}`;
}

function formatTime(value?: string | null): string {
  if (!value) {
    return '';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '';
  }

  return parsed.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatAmount(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return '0';
  }
  return amountFormatter.format(value);
}

function formatJobStatus(status: string | undefined | null): string {
  if (!status) {
    return 'Pending';
  }
  const normalized = status.toString().trim().toUpperCase().replace(/-/g, '_');
  switch (normalized) {
    case 'IN_PROGRESS':
      return 'In-progress';
    case 'CANCELED':
    case 'CANCELLED':
      return 'Canceled';
    case 'DISPUTED':
      return 'Disputed';
    case 'COMPLETED':
      return 'Completed';
    case 'PENDING':
    default:
      return 'Pending';
  }
}

const JOB_STATUS_API_MAP: Record<string, string> = {
  Pending: 'PENDING',
  'In-progress': 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Disputed: 'DISPUTED',
  Completed: 'COMPLETED',
};

function mapStatusFilterToApi(value: string): string {
  return JOB_STATUS_API_MAP[value] ?? value.toUpperCase();
}

function buildUserProfile(customer: AdminCustomer): UserProfile {
  const name = [customer.firstname, customer.lastname].filter(Boolean).join(' ') || customer.email;
  const status = STATUS_LABELS[customer.status] ?? 'Pending';

  return {
    id: customer.uuid,
    name,
    gender: '',
    status,
    email: customer.email,
    phone: customer.phone ?? '—',
    dob: formatDate(customer.createdAt),
    nin: '',
    bvn: '',
    avatar: '' as IconRef,
    passport: '' as IconRef,
    jobs: [],
  wallet: [],
    chat: [],
  };
}

function mapCustomerJobToJobItem(job: AdminCustomerJob): JobItem {
  const serviceProviderName = [
    job.serviceProvider?.firstname,
    job.serviceProvider?.lastname,
  ]
    .filter(Boolean)
    .join(' ');

  const displayProviderName = serviceProviderName || '—';
  const serviceProvider = {
    name: displayProviderName,
    role: job.serviceProvider?.serviceCategory ?? '—',
    icon: job.serviceProvider?.picture ?? undefined,
    uuid: job.serviceProvider?.uuid,
  };

  const timeline: JobItem['timeline'] = {};
  if (job.acceptedAt) {
    timeline.accepted = {
      date: formatDate(job.acceptedAt),
      time: formatTime(job.acceptedAt),
    };
  }

  const startSource = job.startDate ?? job.createdAt;
  if (startSource) {
    timeline.started = {
      date: formatDate(startSource),
      time: formatTime(startSource),
    };
  }

  const endSource = job.endDate;
  if (endSource) {
    timeline.ended = {
      date: formatDate(endSource),
      time: formatTime(endSource),
    };
  }

  const displayId = job.requestId ?? job.code;

  return {
    jobId: displayId,
    jobUuid: job.uuid,
    requestId: job.requestId ?? undefined,
    jobCode: job.code,
    serviceProvider,
    amount: formatAmount(job.price),
    status: formatJobStatus(job.status),
    jobDesc: job.description ?? '',
    timeline,
  } as JobItem;
}

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
  const [conversationContext, setConversationContext] = useState<
    { providerUuid?: string; customerUuid: string; job: JobItem } | null
  >(null);
  const { selectedCustomer, setSelectedCustomer } = useSelectedCustomerStore((state) => ({
    selectedCustomer: state.selectedCustomer,
    setSelectedCustomer: state.setSelectedCustomer,
  }));
  const { data: fetchedCustomer, isLoading: customerLoading } = useAdminCustomer(
    selectedCustomer ? undefined : id,
    { enabled: !selectedCustomer },
  );

  const user = useMemo<UserProfile | null>(() => {
    if (selectedCustomer && selectedCustomer.uuid === id) {
      return buildUserProfile(selectedCustomer);
    }
    if (fetchedCustomer && fetchedCustomer.uuid === id) {
      return buildUserProfile(fetchedCustomer);
    }
    return null;
  }, [fetchedCustomer, id, selectedCustomer]);

  useEffect(() => {
    if (!selectedCustomer && fetchedCustomer && fetchedCustomer.uuid === id) {
      setSelectedCustomer(fetchedCustomer);
    }
  }, [fetchedCustomer, id, selectedCustomer, setSelectedCustomer]);

  const handleSuspendClick = (profile: UserProfile) => {
    setSelectedUsers(profile);
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
  const [walletStatusFilter, setWalletStatusFilter] = useState<string>('');
  const [walletPage, setWalletPage] = useState<number>(1);
  const walletPageSize = 10;
  const debouncedSearch = useDebouncedValue(search, 400);
  const apiStatus = statusFilter ? mapStatusFilterToApi(statusFilter) : undefined;

  const {
    data: jobsResponse,
    isLoading: jobsLoading,
    isFetching: jobsFetching,
    error: jobsError,
  } = useAdminCustomerJobs(
    user?.id,
    {
      page: currentPage,
      limit: itemsPerPage,
      status: apiStatus,
      search: debouncedSearch || undefined,
    },
    { enabled: Boolean(user?.id) },
  );

  const jobsPagination = jobsResponse?.pagination;

  const mappedJobs = useMemo<JobItem[]>(() => {
    const raw = jobsResponse?.data ?? [];
    return raw.map(mapCustomerJobToJobItem);
  }, [jobsResponse]);

  const sortedData = useMemo<JobItem[]>(() => {
    if (!sortConfig.key) return mappedJobs;
    const key = sortConfig.key;
    const dir = sortConfig.direction;
    const toNum = (v: string | undefined) => Number((v || '').replace(/[^\d]/g, '')) || 0;
    const cmp = (a: string | undefined, b: string | undefined) =>
      (a || '').localeCompare(b || '', undefined, { numeric: true, sensitivity: 'base' });
    return [...mappedJobs].sort((a, b) => {
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
        case 'reason':
          result = cmp(a.statusReason, b.statusReason);
          break;
        default:
          result = 0;
      }
      return dir === 'asc' ? result : -result;
    });
  }, [mappedJobs, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search, user?.id]);

  const totalItems = jobsPagination?.total ?? sortedData.length;
  const totalPages = jobsPagination?.pages ?? 1;
  const paginatedData = sortedData;
  const showJobsSkeleton = jobsLoading || jobsFetching;
  const isJobsEmpty = !showJobsSkeleton && paginatedData.length === 0;

  const walletQueryEnabled = activeTab === 'wallet' && Boolean(user?.id);
  const {
    data: walletResponse,
    isLoading: walletLoading,
    isFetching: walletFetching,
    error: walletError,
  } = useCustomerWallet(
    user?.id,
    { page: walletPage, limit: walletPageSize, status: walletStatusFilter || undefined },
    { enabled: walletQueryEnabled },
  );

  const walletData = walletResponse?.data;
  const walletTransactions = walletData?.transactions ?? [];
  const walletPagination = walletData?.pagination;
  const walletTotalPages = walletPagination?.pages ?? 1;
  const walletTotalItems = walletPagination?.total ?? walletTransactions.length;
  const walletBalance = walletData?.wallet?.availableBalance ?? 0;

  useEffect(() => {
    if (!walletQueryEnabled) {
      return;
    }
    setWalletPage(1);
  }, [walletStatusFilter, user?.id, walletQueryEnabled]);

  if (!user) {
    if (customerLoading) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center text-sm text-[#757C91]">
          Loading user profile…
        </div>
      );
    }

    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <p className="text-lg font-semibold text-[#3B4152]">We couldn&apos;t load this user&apos;s details.</p>
        <p className="text-sm text-[#757C91]">Return to the users list and select a profile to view details.</p>
      </div>
    );
  }

  const availableBalance = amountFormatter.format(walletBalance);

  return (
    <div className="min-h-screen bg-[#F9F9FB]">
      <div className="pb-6">
        <section className="border-b border-[#EAECF5] bg-white">
          <ProfileHeader
            usersData={user}
            status={user.status}
            onOpenVerfication={() => setOpen(true)}
            handleSuspendClick={handleSuspendClick}
          />

          <div className="flex border-t border-b border-[#EAECF5] bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#017441] border-b-2 border-[#02CA71]'
                    : 'text-[#757C91] hover:text-[#47516B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'jobs' ? (
            <div className="space-y-0">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAECF5] px-5 py-5">
                <div>
                  <h1 className="text-lg font-semibold text-[#0E171A]">
                    {totalItems.toLocaleString('en-US')} Jobs
                  </h1>
                  <p className="text-sm font-medium text-[#99A1B3]">Job history for this user.</p>
                </div>
                <JobsFiltersBar
                  status={statusFilter}
                  setStatus={setStatusFilter}
                  search={search}
                  setSearch={setSearch}
                />
              </div>

              {jobsError ? (
                <div className="px-5 py-12 text-center text-sm text-[#EA3829]">
                  Unable to load jobs. {jobsError.message}
                </div>
              ) : showJobsSkeleton ? (
                <div className="px-5 py-6">
                  <div className="overflow-hidden rounded-3xl border border-[#EAECF5] bg-white">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-14 w-full animate-pulse border-b border-[#EAECF5] bg-[#F5F6FA]"
                      />
                    ))}
                  </div>
                </div>
              ) : isJobsEmpty ? (
                <div className="px-5 py-12 text-center text-sm text-[#757C91]">
                  No jobs found for this user.
                </div>
              ) : (
                <div className="px-5 py-6">
                  <JobsTable
                    jobs={paginatedData}
                    onSortChange={setSortConfig}
                    sortConfig={sortConfig}
                    onOpenJobDetails={(job) => {
                      setSelectedJob(job);
                      setOpenJob(true);
                    }}
                  />
                </div>
              )}

              <div className="px-5 pb-6">
                <UsersPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  isLoading={jobsLoading || jobsFetching}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4 px-5 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#99A1B3]">
                  Available balance
                </p>
                <p className="text-2xl font-bold text-[#0E171A]">₦{availableBalance}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#0E171A]">Transaction history</h2>
                  <p className="text-xs font-medium text-[#99A1B3]">
                    Recent wallet activity for this user.
                  </p>
                </div>
                <WalletsFiltersBar value={walletStatusFilter} onChange={setWalletStatusFilter} />
              </div>
              {walletError ? (
                <div className="rounded-3xl border border-[#EAECF5] bg-white px-5 py-12 text-center text-sm text-[#EA3829]">
                  Unable to load wallet transactions. {walletError.message}
                </div>
              ) : walletLoading || walletFetching ? (
                <div className="rounded-3xl border border-[#EAECF5] bg-white px-5 py-12 text-center text-sm text-[#757C91]">
                  Loading wallet transactions…
                </div>
              ) : (
                <WalletTable transactions={walletTransactions} />
              )}

              <UsersPagination
                currentPage={walletPage}
                totalPages={walletTotalPages}
                totalItems={walletTotalItems}
                itemsPerPage={walletPageSize}
                onPageChange={setWalletPage}
                isLoading={walletLoading || walletFetching}
              />
            </div>
          )}
        </section>
      </div>

      <SlideOverModal open={open} onOpenChange={setOpen} title="Verification details">
        <VerificationInfo usersData={user} />
      </SlideOverModal>

      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Job details">
        {selectedJob && (
          <JobDetails
            usersData={user}
            jobs={selectedJob}
            onOpenChat={({ providerUuid, customerUuid, job }) => {
              setConversationContext({ providerUuid, customerUuid, job });
              setOpenJob(false);
              setOpenChat(true);
            }}
          />
        )}
      </SlideOverModal>

      <SlideOverModal
        open={openChat}
        onOpenChange={(value) => {
          setOpenChat(value);
          if (!value) {
            setConversationContext(null);
          }
        }}
        title="Chat"
      >
        {conversationContext ? (
          <ChatView
            providerUuid={conversationContext.providerUuid}
            customerUuid={conversationContext.customerUuid}
            job={conversationContext.job}
            customer={user}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#757C91]">
            Select a conversation to view messages.
          </div>
        )}
      </SlideOverModal>

      <Modal
        open={openSuspend}
        onOpenChange={setSuspendOpen}
        title={user?.status === 'Suspended' ? 'Reactivate User' : 'Suspend User'}
      >
        <Suspend usersData={user} onSuccess={() => setSuspendOpen(false)} />
      </Modal>
    </div>
  );
}
