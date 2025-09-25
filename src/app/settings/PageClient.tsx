'use client';
import { settingsData } from '@/data/settingsDummyData';
import type { SettingsCategoryItem } from '@/types/types';
import { Button } from '@/components/ui';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import JobsFiltersBar from '@/components/settings/JobsFiltersBar';
import ChatsReport from '@/components/settings/ChatsReport';
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
import DeclinedOffers from '@/components/settings/DeclinedOffers';
import CancelOffers from '@/components/settings/CancelOffers';
import CancelJobs from '@/components/settings/CancelJobs';
import JobsDisputes from '@/components/settings/JobsDisputes';
import DeleteAccounts from '@/components/settings/DeleteAccounts';
import RatingsBadges from '@/components/settings/Ratings-Badges';
import JobsTips from '@/components/settings/JobsTips';
import AddTipForm from '@/components/settings/AddTipForm';

export default function SettingsPage() {
  const [update, setUpdate] = useState(false);
  const [openJob, setOpenJob] = useState(false);
  const [openSuspend, setSuspendOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openAddTip, setOpenAddTip] = useState(false);
  const [openEditTip, setOpenEditTip] = useState(false);
  const [selectedTip, setSelectedTip] = useState<any | null>(null);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedRole, setSelectedRole] = useState<SettingsCategoryItem | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SettingsCategoryItem | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState<SettingsCategoryItem | false>(false);
  const [selectedJob, setSelectedJob] = useState<SettingsCategoryItem | null>(null);

  const users: SettingsCategoryItem[] = settingsData;

  // Ratings & Badges actions
  const ratingsRef = useRef<any>(null);
  const [ratingsDirty, setRatingsDirty] = useState(false);

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
        <AddMemberForm
          onSuccess={() => setOpenJob(false)}
          jobs={users}
          onRequestDeleteCategory={() => {
            setOpenJob(false); // close JobDetails first
            setOpenDeleteCategory(true); // then open DeleteCategory modal
          }}
        />
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
            onSuccess={() => setOpenEditTip(false)}
          />
        )}
      </SlideOverModal>

      <SlideOverModal open={openAddTip} onOpenChange={setOpenAddTip} title="Add tip">
        <AddTipForm onSuccess={() => setOpenAddTip(false)} />
      </SlideOverModal>

      <EditRoleSlideOver open={openEditRole} onOpenChange={setOpenEditRole} role={selectedRole} />

      {/* Delete Category modal */}
      <Modal open={openDeleteCategory} onOpenChange={setOpenDeleteCategory} title="Delete category">
        <DeleteCategory
          categories={users.map((u) => u.category)}
          onSuccess={() => setOpenDeleteCategory(false)}
        />
      </Modal>

      <Modal open={openDelete} onOpenChange={setOpenDelete} title="Delete role">
        <Delete onSuccess={() => setOpenDelete(false)} />
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

          <JobsTable
            jobs={paginatedData}
            onOpenJobDetails={(job) => {
              setSelectedJob(job);
              setUpdate(true);
            }}
            onEdit={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
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
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Chat Report Reasons</h2>
          </div>
          <ChatsReport
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'offer-declines' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Offer Decline Reasons</h2>
          </div>
          <DeclinedOffers
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'offer-cancelation' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Offer Cancellation Reasons</h2>
          </div>
          <CancelOffers
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'job-cancelation' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Job Cancellation Reasons</h2>
          </div>
          <CancelJobs
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'job-dispute-report' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Job Dispute & Report Reasons</h2>
          </div>
          <JobsDisputes
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'delete-account' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Delete Account Reasons</h2>
          </div>
          <DeleteAccounts
            report={users}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}

      {activeTab === 'ratings-badges' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">Ratings & Badges</h2>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => ratingsRef.current?.reset?.()}
                className="px-4 py-2 border border-[#D6DBE7] bg-white text-[#017441] font-semibold"
              >
                Reset
              </Button>
              <Button
                type="button"
                disabled={!ratingsDirty}
                onClick={() => {
                  const data = ratingsRef.current?.save?.();
                  if (data) {
                    // Integrate API call here if available
                    console.log('Ratings & Badges saved:', data);
                  }
                }}
              >
                Save changes
              </Button>
            </div>
          </div>
          <RatingsBadges ref={ratingsRef} report={users} onDirtyChange={setRatingsDirty} />
        </div>
      )}

      {activeTab === 'job-tips' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-lg font-bold">
              {users.filter((u) => u.jobTips).length} Job tips
            </h2>
            <Button
              onClick={() => setOpenAddTip(true)}
              className="flex items-center gap-2 !py-2 !px-3"
            >
              <Plus size={18} />
              Add Tip
            </Button>
          </div>
          <JobsTips
            jobs={users}
            onEditRole={(tip) => {
              setSelectedTip(tip); // store the clicked tip
              setOpenEditTip(true); // open the slide over modal
            }}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      )}
    </div>
  );
}
