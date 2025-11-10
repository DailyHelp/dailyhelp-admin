'use client';
import { settingsData } from '@/data/settingsDummyData';
import type { SettingsCategoryItem } from '@/types/types';
import type { AdminJobTip } from '@/features/settings/types';
import { Button } from '@/components/ui';
import { useState, useMemo, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import JobsFiltersBar from '@/components/settings/JobsFiltersBar';
import JobsTable from '@/components/settings/JobsTable';
import UsersPagination from '@/components/settings/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import Delete from '@/components/settings/Delete';
import JobDetails from '@/components/settings/JobDetails';
import Suspend from '@/components/settings/Suspend';
import AddMemberForm from '@/components/settings/AddMemberForm';
import AddRoleForm from '@/components/settings/AddRoleForm';
import EditRoleSlideOver from '@/components/settings/EditRoleSlideOver';
import DeleteCategory from '@/components/settings/DeleteCategory';
import CancelJobs from '@/components/settings/CancelJobs';
import JobsDisputes from '@/components/settings/JobsDisputes';
import DeleteAccounts from '@/components/settings/DeleteAccounts';
import RatingsBadges from '@/components/settings/Ratings-Badges';
import JobsTips from '@/components/settings/JobsTips';
import AddTipForm from '@/components/settings/AddTipForm';
import ChatReportTab from '@/components/settings/tabs/ChatReportTab';
import OfferDeclineTab from '@/components/settings/tabs/OfferDeclineTab';
import OfferCancellationTab from '@/components/settings/tabs/OfferCancellationTab';
import JobCancellationTab from '@/components/settings/tabs/JobCancellationTab';
import JobDisputeTab from '@/components/settings/tabs/JobDisputeTab';
import DeleteAccountTab from '@/components/settings/tabs/DeleteAccountTab';
import { useAdminMainCategories, useAdminJobTips } from '@/features/settings/hooks';
import { mapAdminMainCategoriesToSettingsCategories } from '@/features/settings/utils';

export default function SettingsPage() {
  const [update, setUpdate] = useState(false);
  const [openJob, setOpenJob] = useState(false);
  const [openSuspend, setSuspendOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openAddTip, setOpenAddTip] = useState(false);
  const [openEditTip, setOpenEditTip] = useState(false);
  const [selectedTip, setSelectedTip] = useState<AdminJobTip | null>(null);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SettingsCategoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SettingsCategoryItem | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState<SettingsCategoryItem | false>(false);
  const [selectedJob, setSelectedJob] = useState<SettingsCategoryItem | null>(null);

  const {
    data: mainCategoriesResponse,
    isLoading: isLoadingMainCategories,
    error: mainCategoriesError,
  } = useAdminMainCategories();

  const {
    data: jobTipsResponse,
    isLoading: isLoadingJobTips,
    error: jobTipsError,
  } = useAdminJobTips();

  const apiCategories = mapAdminMainCategoriesToSettingsCategories(mainCategoriesResponse?.data ?? []);

  const users: SettingsCategoryItem[] = apiCategories.length > 0 ? apiCategories : settingsData;
  const jobTips = jobTipsResponse?.data ?? [];
  const jobTipsErrorMessage = jobTipsError?.message;
  const isUsingFallbackCategories = apiCategories.length === 0;
  const mainCategoriesErrorMessage = mainCategoriesError?.message;

  // Ratings & Badges actions
  const ratingsRef = useRef<any>(null);
  const [ratingsDirty, setRatingsDirty] = useState(false);
  const [ratingsSaving, setRatingsSaving] = useState(false);

  const handleSuspendClick = (user: any) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
  };
  const handleDeleteClick = (user: any) => {
    setSelectedUsers(user);
    setOpenDelete(true);
  };
  // --- State for tabs ---
  const [activeTab, setActiveTab] = useState<string>('categories');
  const tabs = [
    { id: 'categories', label: 'Categories' },
    { id: 'chat-report', label: 'Chat report' },
    { id: 'offer-declines', label: 'Offer declines' },
    { id: 'offer-cancelation', label: 'Offer cancelation' },
    { id: 'job-cancelation', label: 'Job cancelation' },
    { id: 'job-dispute-report', label: 'Job dispute & report' },
    { id: 'delete-account', label: 'Delete account' },
    { id: 'ratings-badges', label: 'Ratings & Badges' },
    { id: 'job-tips', label: 'Job tips' },
  ];
  // --- Job filtering ---
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const filteredJobs = useMemo<SettingsCategoryItem[]>(() => {
    const q = search.toLowerCase();
    return users.filter((item) => {
      const idMatch = (item.jobId || '').toLowerCase().includes(q);
      const categoryMatch = (item.category || '').toLowerCase().includes(q);
      return idMatch || categoryMatch;
    });
  }, [users, search]);

  // 2. Sorting
  const sortedData = useMemo<SettingsCategoryItem[]>(() => {
    if (!sortConfig.key) return filteredJobs;
    const key = sortConfig.key as keyof SettingsCategoryItem;
    return [...filteredJobs].sort((a, b) => {
      const av = (a?.[key] ?? '').toString();
      const bv = (b?.[key] ?? '').toString();
      if (av < bv) return sortConfig.direction === 'asc' ? -1 : 1;
      if (av > bv) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredJobs, sortConfig]);

  // 4. Pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="py-6 space-y-4">
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Add category">
        <AddMemberForm onSuccess={() => setOpenJob(false)} />
      </SlideOverModal>

      <SlideOverModal open={update} onOpenChange={setUpdate} title="Edit category">
        {selectedJob && (
          <JobDetails
            onSuccess={() => {
              setUpdate(false); // close JobDetails after save
            }}
            jobs={selectedJob}
            onRequestDeleteCategory={() => {
              setUpdate(false); // close JobDetails first
              setOpenDeleteCategory(true); // then open DeleteCategory modal
            }}
          />
        )}
      </SlideOverModal>

      <Modal open={openSuspend} onOpenChange={setSuspendOpen} title="Remove team member">
        <Suspend usersData={{ status: 'Pending' }} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      <SlideOverModal open={openAddRole} onOpenChange={setOpenAddRole} title="Add role">
        <AddRoleForm onSuccess={() => setOpenAddRole(false)} />
      </SlideOverModal>

      <SlideOverModal open={openEditTip} onOpenChange={setOpenEditTip} title="Edit tip">
        {selectedTip && (
          <AddTipForm
            tip={selectedTip} // 👈 pass down the tip to prefill
            onSuccess={() => {
              setOpenEditTip(false);
              setSelectedTip(null);
            }}
          />
        )}
      </SlideOverModal>

      <SlideOverModal open={openAddTip} onOpenChange={setOpenAddTip} title="Add tip">
        <AddTipForm
          onSuccess={() => {
            setOpenAddTip(false);
            setSelectedTip(null);
          }}
        />
      </SlideOverModal>

      <EditRoleSlideOver open={openEditRole} onOpenChange={setOpenEditRole} role={selectedRole} />

      {/* Delete Category modal */}
      <Modal open={openDeleteCategory} onOpenChange={setOpenDeleteCategory} title="Delete category">
        <DeleteCategory
          categories={users.map((u) => u.category)}
          onSuccess={() => setOpenDeleteCategory(false)}
        />
      </Modal>

      <Modal
        open={openDelete}
        onOpenChange={(isOpen) => {
          setOpenDelete(isOpen);
          if (!isOpen) {
            setSelectedTip(null);
          }
        }}
        title="Delete job tip"
      >
        <Delete
          tip={selectedTip}
          onSuccess={() => {
            setOpenDelete(false);
            setSelectedTip(null);
          }}
        />
      </Modal>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-[15px]  transition-colors ${
              activeTab === tab.id
                ? 'text-[#017441] font-bold border-b-2  border-[#02CA71]'
                : 'text-[#757C91] font-medium hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'categories' && (
        <>
          <div className="px-6  flex items-center justify-between bg-white">
            <h1 className="font-bold text-[#3B4152]">{users.length} Main categories</h1>
            <JobsFiltersBar
              jobs={paginatedData}
              status={statusFilter}
              setStatus={setStatusFilter}
              search={search}
              setSearch={setSearch}
              onOpenJobDetails={() => {
                setOpenJob(true);
              }}
            />
          </div>

          {isLoadingMainCategories && isUsingFallbackCategories && (
            <p className="px-6 text-sm text-[#757C91]">Loading categories…</p>
          )}
          {mainCategoriesErrorMessage && isUsingFallbackCategories && (
            <p className="px-6 text-sm text-[#EA3829]">
              Unable to load categories. Showing defaults instead. {mainCategoriesErrorMessage}
            </p>
          )}

          <JobsTable
            jobs={paginatedData}
            onOpenJobDetails={(job) => {
              setSelectedJob(job);
              setUpdate(true);
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

      {activeTab === 'chat-report' && (
        <ChatReportTab />
      )}

      {activeTab === 'offer-declines' && <OfferDeclineTab />}

      {activeTab === 'offer-cancelation' && <OfferCancellationTab />}

      {activeTab === 'job-cancelation' && <JobCancellationTab />}

      {activeTab === 'job-dispute-report' && <JobDisputeTab />}

      {activeTab === 'delete-account' && <DeleteAccountTab />}

      {activeTab === 'ratings-badges' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Ratings & Badges</h2>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                disabled={ratingsSaving}
                onClick={() => ratingsRef.current?.reset?.()}
                className="px-4 py-2 border border-[#D6DBE7] bg-white text-[#017441] font-semibold disabled:opacity-60"
              >
                Reset
              </Button>
              <Button
                type="button"
                disabled={!ratingsDirty || ratingsSaving}
                onClick={async () => {
                  if (!ratingsRef.current?.save) return;
                  try {
                    setRatingsSaving(true);
                    const result = await ratingsRef.current.save();
                    if (result.updated > 0) {
                      toast.success('Account tiers updated', { duration: 2000 });
                    } else {
                      toast('No changes to save.', { duration: 2000 });
                    }
                  } catch (error) {
                    const message =
                      error instanceof Error ? error.message : 'Unable to save account tiers.';
                    toast.error(message, { duration: 3000 });
                  } finally {
                    setRatingsSaving(false);
                  }
                }}
              >
                {ratingsSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </div>
          <RatingsBadges ref={ratingsRef} onDirtyChange={setRatingsDirty} />
        </div>
      )}

      {activeTab === 'job-tips' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">{jobTips.length} Job tips</h2>
            <Button
              onClick={() => {
                setSelectedTip(null);
                setOpenAddTip(true);
              }}
              className="flex items-center gap-2 !py-2 !px-3"
            >
              <Plus size={18} />
              Add Tip
            </Button>
          </div>
          {isLoadingJobTips ? (
            <p className="px-6 text-sm text-[#757C91]">Loading job tips…</p>
          ) : jobTipsErrorMessage ? (
            <p className="px-6 text-sm text-[#EA3829]">
              Unable to load job tips. {jobTipsErrorMessage}
            </p>
          ) : (
            <JobsTips
              tips={jobTips}
              onEditTip={(tip) => {
                setSelectedTip(tip);
                setOpenEditTip(true);
              }}
              onDeleteTip={(tip) => {
                setSelectedTip(tip);
                setOpenDelete(true);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
