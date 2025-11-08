'use client';

import { useEffect, useMemo, useState } from 'react';
import type { IconRef, JobItem, JobSortKey, ProviderProfile, SortConfig } from '@/types/types';
import ProfileHeader from '@/components/providers/ProfileHeader';
import Overview from '@/components/providers/Overview';
import Analytics from '@/components/providers/Analytics';
import JobsFiltersBar from '@/components/providers/JobsFiltersBar';
import WalletsFiltersBar from '@/components/providers/WalletsFiltersBar';
import JobsTable from '@/components/providers/JobsTable';
import WalletsTable from '@/components/providers/WalletsTable';
import UsersPagination from '@/components/providers/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import VerificationInfo from '@/components/providers/VerificationInfoModal';
import JobDetails from '@/components/providers/JobDetails';
import Suspend from '@/components/providers/Suspend';
import ChatView from '@/components/providers/ChatView';
import {
  useAdminProvider,
  useAdminProviderAnalytics,
  useAdminProviderJobs,
  useAdminProviderReviews,
  useProviderWallet,
} from '@/features/providers/hooks';
import {
  AdminProviderStatus,
  type AdminProvider,
  type AdminProviderJob,
  type AdminProviderAnalyticsData,
  type AdminProviderAnalyticsFilter,
} from '@/features/providers/types';
import { useSelectedProviderStore } from '@/features/providers/store';
import type { ProviderAnalytics } from '@/types/types';

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const STATUS_LABELS: Record<AdminProviderStatus | string, string> = {
  VERIFIED: 'Verified',
  UNVERIFIED: 'Pending',
  SUSPENDED: 'Suspended',
};

const JOB_STATUS_API_MAP: Record<string, string> = {
  Pending: 'PENDING',
  'In-progress': 'IN_PROGRESS',
  Canceled: 'CANCELED',
  Disputed: 'DISPUTED',
  Completed: 'COMPLETED',
};

function formatDate(value?: string | null): string {
  if (!value) {
    return '—';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '—';
  }
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
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

const amountFormatter = new Intl.NumberFormat('en-NG', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

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

function mapStatusFilterToApi(value: string): string | undefined {
  if (!value) {
    return undefined;
  }
  return JOB_STATUS_API_MAP[value] ?? value.toUpperCase();
}

function buildProviderProfile(provider: AdminProvider): ProviderProfile {
  const name =
    [provider.firstname, provider.lastname].filter(Boolean).join(' ') ||
    provider.email ||
    'Service provider';
  const status = STATUS_LABELS[provider.status ?? ''] ?? 'Pending';

  return {
    id: provider.uuid,
    name,
    gender: provider.gender ?? '',
    status,
    email: provider.email ?? '—',
    phone: provider.phone ?? '—',
    dob: provider.dob ? formatDate(provider.dob) : provider.createdAt ? formatDate(provider.createdAt) : '—',
    nin: provider.nin ?? '—',
    bvn: provider.bvn ?? '—',
    avatar: (provider.picture ?? '') as IconRef,
    passport: (provider.passport ?? '') as IconRef,
    category: provider.serviceCategory ?? provider.primaryCategory ?? provider.category ?? '—',
    address: provider.address ?? '',
    direction: '',
    jobs: [],
    wallet: [],
  };
}

function mapProviderJobToJobItem(job: AdminProviderJob, provider: ProviderProfile): JobItem {
  const customerName =
    [job.customer?.firstname, job.customer?.lastname].filter(Boolean).join(' ') ||
    job.customer?.email ||
    'Client';

  const timeline: JobItem['timeline'] = {};
  if (job.acceptedAt) {
    timeline.accepted = {
      date: formatDate(job.acceptedAt),
      time: formatTime(job.acceptedAt),
    };
  }
  if (job.startDate || job.createdAt) {
    const source = job.startDate ?? job.createdAt;
    timeline.started = {
      date: formatDate(source ?? undefined),
      time: formatTime(source ?? undefined),
    };
  }
  if (job.endDate) {
    timeline.ended = {
      date: formatDate(job.endDate),
      time: formatTime(job.endDate),
    };
  }

  return {
    jobId: job.requestId ?? job.code,
    jobUuid: job.uuid,
    requestId: job.requestId ?? undefined,
    serviceProvider: {
      name: provider.name,
      role: provider.category,
      icon: provider.avatar,
      uuid: provider.id,
    },
    client: {
      name: customerName,
      email: job.customer?.email,
      uuid: job.customer?.uuid,
    },
    amount: formatAmount(job.price),
    status: formatJobStatus(job.status),
    jobDesc: job.description ?? '',
    timeline,
  } as JobItem;
}

function mapAnalyticsResponse(data: AdminProviderAnalyticsData | null | undefined): ProviderAnalytics {
  const revenue = data?.revenue ?? {};
  const jobs = data?.jobs ?? {};
  const offers = data?.offers ?? {};

  const earnings = Number(revenue.earnings ?? 0);
  const tips = Number(revenue.tips ?? 0);
  const commission = Number(revenue.commission ?? 0);
  const jobPayment = Number(revenue.jobPayment ?? earnings);
  const deductions = Number(revenue.otherIncome ?? 0);
  const finalEarnings = earnings + tips - deductions;
  const commissionRate =
    jobPayment > 0 ? ((commission / jobPayment) * 100).toFixed(1) : (revenue.otherIncome ?? '0');

  const totalOffers =
    offers.total ??
    (offers.accepted ?? 0) +
      (offers.declined ?? 0) +
      (offers.cancelled ?? 0) +
      (offers.declinedByClient ?? 0) +
      (offers.cancelledByClient ?? 0);

  const toRate = (value?: number | null) =>
    totalOffers > 0 ? Number((((value ?? 0) / totalOffers) * 100).toFixed(1)) : 0;

  return {
    revenue: {
      earnings,
      tips,
      commission,
      breakdown: {
        jobPayment,
        tips,
        income: jobPayment + tips,
        commissionRate: commissionRate?.toString() ?? '0',
        deductions,
        finalEarnings: finalEarnings > 0 ? finalEarnings : earnings,
      },
    },
    jobs: {
      total: jobs.total ?? 0,
      completed: jobs.completed ?? 0,
      canceled: jobs.canceled ?? 0,
      disputed: jobs.disputed ?? 0,
    },
    offers: {
      total: totalOffers,
      accepted: offers.accepted ?? 0,
      declined: offers.declined ?? 0,
      cancelled: offers.cancelled ?? 0,
      declinedByClient: offers.declinedByClient ?? 0,
      cancelledByClient: offers.cancelledByClient ?? 0,
    },
    offersRate: {
      acceptanceRate: toRate(offers.accepted),
      declineRate: toRate(offers.declined),
      cancelledRate: toRate(offers.cancelled),
      cancelledByClientRate: toRate(offers.cancelledByClient),
      declinedByClientRate: toRate(offers.declinedByClient),
    },
  };
}

export default function ProvidersProfilePage({ id }: { id: string }) {
  const [openVerification, setOpenVerification] = useState(false);
  const [openJobDetails, setOpenJobDetails] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [conversationContext, setConversationContext] = useState<{
    customerUuid?: string;
    job: JobItem;
  } | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig<JobSortKey>>({
    key: null,
    direction: 'asc',
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'analytics' | 'wallet'>(
    'overview',
  );

  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const debouncedSearch = useDebouncedValue(search, 400);

  const [reviewsPage, setReviewsPage] = useState(1);
  const reviewsPerPage = 5;

  const [analyticsFilter, setAnalyticsFilter] =
    useState<AdminProviderAnalyticsFilter>('ALL_TIME');

  const [walletStatusFilter, setWalletStatusFilter] = useState('');
  const [walletPage, setWalletPage] = useState(1);
  const walletPageSize = 10;

  const { selectedProvider, setSelectedProvider } = useSelectedProviderStore((state) => ({
    selectedProvider: state.selectedProvider,
    setSelectedProvider: state.setSelectedProvider,
  }));

  const shouldFetchProvider =
    !selectedProvider || (selectedProvider && selectedProvider.uuid !== id);

  const {
    data: fetchedProvider,
    isLoading: providerLoading,
    isFetching: providerFetching,
  } = useAdminProvider(id, { enabled: shouldFetchProvider });

  const providerRecord = useMemo<AdminProvider | null>(() => {
    if (selectedProvider && selectedProvider.uuid === id) {
      return selectedProvider;
    }
    if (fetchedProvider && fetchedProvider.uuid === id) {
      return fetchedProvider;
    }
    return null;
  }, [selectedProvider, fetchedProvider, id]);

  useEffect(() => {
    if (!selectedProvider && fetchedProvider && fetchedProvider.uuid === id) {
      setSelectedProvider(fetchedProvider);
    }
  }, [fetchedProvider, id, selectedProvider, setSelectedProvider]);

  const providerProfile = useMemo<ProviderProfile | null>(() => {
    if (!providerRecord) {
      return null;
    }
    return buildProviderProfile(providerRecord);
  }, [providerRecord]);

  const providerUuid = providerRecord?.uuid;
  const jobsStatus = mapStatusFilterToApi(statusFilter);

  const {
    data: jobsResponse,
    isLoading: jobsLoading,
    isFetching: jobsFetching,
    error: jobsError,
  } = useAdminProviderJobs(
    providerUuid,
    {
      page: currentPage,
      limit: itemsPerPage,
      status: jobsStatus,
      search: debouncedSearch || undefined,
    },
    { enabled: Boolean(providerUuid) },
  );

  const jobsPagination = jobsResponse?.pagination;
  const mappedJobs = useMemo<JobItem[]>(() => {
    if (!providerProfile) {
      return [];
    }
    return (jobsResponse?.data ?? []).map((job) => mapProviderJobToJobItem(job, providerProfile));
  }, [jobsResponse, providerProfile]);

  const sortedJobs = useMemo<JobItem[]>(() => {
    if (!sortConfig.key) {
      return mappedJobs;
    }
    const key = sortConfig.key;
    const direction = sortConfig.direction === 'asc' ? 1 : -1;

    const valueOf = (item: JobItem) => {
      switch (key) {
        case 'jobId':
          return item.jobId.toLowerCase();
        case 'serviceProvider':
          return item.serviceProvider?.name?.toLowerCase() ?? '';
        case 'amount':
          return item.amount ?? '0';
        case 'startDate':
          return item.timeline?.started?.date ?? '';
        case 'endDate':
          return item.timeline?.ended?.date ?? '';
        case 'status':
          return item.status ?? '';
        case 'reason':
          return item.statusReason ?? '';
        default:
          return '';
      }
    };

    return [...mappedJobs].sort((a, b) => {
      const av = valueOf(a);
      const bv = valueOf(b);
      return av.localeCompare(bv, undefined, { numeric: true, sensitivity: 'base' }) * direction;
    });
  }, [mappedJobs, sortConfig]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, search, providerUuid]);

  const totalJobItems = jobsPagination?.total ?? sortedJobs.length;
  const totalJobPages = jobsPagination?.pages ?? 1;
  const isJobsEmpty = !jobsLoading && !jobsFetching && sortedJobs.length === 0;

  const reviewsEnabled = activeTab === 'overview' && Boolean(providerUuid);
  const {
    data: reviewsResponse,
    isLoading: reviewsLoading,
    isFetching: reviewsFetching,
  } = useAdminProviderReviews(
    providerUuid,
    { page: reviewsPage, limit: reviewsPerPage },
    { enabled: reviewsEnabled },
  );

  useEffect(() => {
    setReviewsPage(1);
  }, [providerUuid]);

  const reviewsData = reviewsResponse?.data ?? [];
  const reviewsPagination = reviewsResponse?.pagination;
  const mappedReviews = useMemo(
    () =>
      reviewsData.map((review) => ({
        id: review.uuid,
        name:
          [review.customer?.firstname, review.customer?.lastname].filter(Boolean).join(' ') ||
          review.customer?.email ||
          'Client',
        date: formatDate(review.createdAt),
        text: review.comment ?? review.review ?? 'No comment provided.',
        rating: review.rating ?? 0,
      })),
    [reviewsData],
  );

  const analyticsEnabled = activeTab === 'analytics' && Boolean(providerUuid);
  const {
    data: analyticsResponse,
    isLoading: analyticsLoading,
    isFetching: analyticsFetching,
  } = useAdminProviderAnalytics(
    providerUuid,
    { filter: analyticsFilter },
    { enabled: analyticsEnabled },
  );
  const analyticsData = useMemo<ProviderAnalytics | null>(() => {
    if (!analyticsResponse?.data) {
      return null;
    }
    return mapAnalyticsResponse(analyticsResponse.data);
  }, [analyticsResponse]);

  const walletEnabled = activeTab === 'wallet' && Boolean(providerUuid);
  const {
    data: walletResponse,
    isLoading: walletLoading,
    isFetching: walletFetching,
    error: walletError,
  } = useProviderWallet(
    providerUuid,
    { page: walletPage, limit: walletPageSize, status: walletStatusFilter || undefined },
    { enabled: walletEnabled },
  );

  const walletData = walletResponse?.data;
  const walletTransactions = walletData?.transactions ?? [];
  const walletPagination = walletData?.pagination;
  const walletTotalPages = walletPagination?.pages ?? 1;
  const walletTotalItems = walletPagination?.total ?? walletTransactions.length;
  const walletBalance = walletData?.wallet?.availableBalance ?? 0;

  useEffect(() => {
    if (!walletEnabled) {
      return;
    }
    setWalletPage(1);
  }, [walletStatusFilter, providerUuid, walletEnabled]);

  if (!providerProfile) {
    if (providerLoading || providerFetching) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center text-sm text-[#757C91]">
          Loading provider profile…
        </div>
      );
    }
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <p className="text-lg font-semibold text-[#3B4152]">
          We couldn&apos;t load this provider&apos;s details.
        </p>
        <p className="text-sm text-[#757C91]">
          Return to the providers list and select a profile to view details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB]">
      <div className="pb-6">
        <section className="border-b border-[#EAECF5] bg-white">
          <ProfileHeader
            usersData={providerProfile}
            status={providerProfile.status}
            onOpenVerfication={() => setOpenVerification(true)}
            handleSuspendClick={() => setOpenSuspend(true)}
          />

          <div className="flex border-t border-b border-[#EAECF5] bg-white">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'jobs', label: 'Job History' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'wallet', label: 'Wallet Balance' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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

          {activeTab === 'overview' ? (
            <Overview
              overview={providerProfile.overview}
              usersData={providerProfile}
              reviews={mappedReviews}
              pagination={reviewsPagination}
              isLoadingReviews={reviewsLoading || reviewsFetching}
              onPageChange={setReviewsPage}
            />
          ) : null}

          {activeTab === 'jobs' ? (
            <div className="space-y-0">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAECF5] px-5 py-5">
                <div>
                  <h1 className="text-lg font-semibold text-[#0E171A]">
                    {totalJobItems.toLocaleString('en-US')} Jobs
                  </h1>
                  <p className="text-sm font-medium text-[#99A1B3]">Job history for this provider.</p>
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
              ) : jobsLoading || jobsFetching ? (
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
                  No jobs found for this provider.
                </div>
              ) : (
                <div className="px-5 py-6">
                  <JobsTable
                    jobs={sortedJobs}
                    onSortChange={setSortConfig}
                    sortConfig={sortConfig}
                    onOpenJobDetails={(job) => {
                      setSelectedJob(job);
                      setOpenJobDetails(true);
                    }}
                  />
                </div>
              )}

              <div className="px-5 pb-6">
                <UsersPagination
                  currentPage={currentPage}
                  totalPages={totalJobPages}
                  totalItems={totalJobItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  isLoading={jobsLoading || jobsFetching}
                />
              </div>
            </div>
          ) : null}

          {activeTab === 'analytics' ? (
            <div className="px-5 py-6">
              <Analytics
                analytics={analyticsData}
                activeFilter={analyticsFilter}
                onFilterChange={(filter) => setAnalyticsFilter(filter)}
                isLoading={analyticsLoading || analyticsFetching}
              />
            </div>
          ) : null}

          {activeTab === 'wallet' ? (
            <div className="space-y-4 px-5 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#99A1B3]">
                  Available balance
                </p>
                <p className="text-2xl font-bold text-[#0E171A]">
                  ₦{amountFormatter.format(walletBalance)}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-[#0E171A]">Transaction history</h2>
                  <p className="text-xs font-medium text-[#99A1B3]">
                    Recent wallet activity for this provider.
                  </p>
                </div>
                <WalletsFiltersBar status={walletStatusFilter} setStatus={setWalletStatusFilter} />
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
                <WalletsTable transactions={walletTransactions} />
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
          ) : null}
        </section>
      </div>

      <SlideOverModal open={openVerification} onOpenChange={setOpenVerification} title="Verification details">
        <VerificationInfo usersData={providerProfile} />
      </SlideOverModal>

      <SlideOverModal open={openJobDetails} onOpenChange={setOpenJobDetails} title="Job details">
        {selectedJob && (
          <JobDetails
            provider={providerProfile}
            job={selectedJob}
            onOpenChat={({ customerUuid, job }) => {
              setConversationContext({ customerUuid, job });
              setOpenJobDetails(false);
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
            providerUuid={providerProfile.id}
            customerUuid={conversationContext.customerUuid}
            job={conversationContext.job}
            provider={providerProfile}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[#757C91]">
            Select a conversation to view messages.
          </div>
        )}
      </SlideOverModal>

      <Modal
        open={openSuspend}
        onOpenChange={setOpenSuspend}
        title={providerProfile.status === 'Suspended' ? 'Reactivate Provider' : 'Suspend Provider'}
      >
        <Suspend usersData={providerProfile} onSuccess={() => setOpenSuspend(false)} />
      </Modal>
    </div>
  );
}
