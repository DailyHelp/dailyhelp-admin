'use client';

import { teamMembersData } from '@/data/teamMembersDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/team-members/JobsFiltersBar';
import WalletsFiltersBar from '@/components/team-members/WalletsFiltersBar';
import WalletsTable from '@/components/team-members/WalletsTable';
import JobsTable from '@/components/team-members/JobsTable';
import UsersPagination from '@/components/team-members/UsersPagination';
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
import Delete from '@/components/team-members/Delete';
import JobDetails from '@/components/team-members/JobDetails';
import ResolutionModal from '@/components/team-members/ResolutionModal';
import AddMemberForm from '@/components/team-members/AddMemberForm';
import AddRoleForm from '@/components/team-members/AddRoleForm';
import EditRoleSlideOver from '@/components/team-members/EditRoleSlideOver';

import type { TeamMember, Role } from '@/types/types';
import { rolesData } from '@/data/teamMembersDummyData';
import Button from '@/components/ui/Button';

// --- Props ---
interface TeamMembersProfilePageProps {
  id?: string;
}

interface SortConfig {
  key: keyof TeamMember | null;
  direction: 'asc' | 'desc';
}

export default function TeamMembersProfilePage({ id }: TeamMembersProfilePageProps) {
  // --- Modal states ---
  const [update, setUpdate] = useState(false);
  const [openJob, setOpenJob] = useState(false);
  const [openSuspend, setSuspendOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);

  // --- Selected items ---
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<TeamMember | null>(null);
  const [selectedJob, setSelectedJob] = useState<TeamMember | null>(null);

  // --- Sorting ---
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  // --- Data ---
  const users: TeamMember[] = teamMembersData;

  // --- Handlers ---
  const handleSuspendClick = (user: TeamMember) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
  };

  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setOpenDelete(true);
  };

  // --- Tabs ---
  const [activeTab, setActiveTab] = useState<'team' | 'roles'>('team');
  const tabs = [
    { id: 'team', label: 'Team members' },
    { id: 'roles', label: 'Roles' },
  ] as const;

  // --- Filters ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Filtering ---
  const filteredJobs = useMemo(() => {
    return users.filter((user) => {
      const q = search.toLowerCase();
      const matchesSearch =
        user.jobId.toLowerCase().includes(q) ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter ? user.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  // --- Sorting ---
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredJobs;

    const key = sortConfig.key as keyof TeamMember;

    return [...filteredJobs].sort((a, b) => {
      const aVal = a[key] ?? '';
      const bVal = b[key] ?? '';
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredJobs, sortConfig]);

  // --- Reset page when filter/sort changes ---
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, sortConfig]);

  // --- Pagination ---
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="py-6 space-y-4">
      {/* Add Member */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Add member">
        <AddMemberForm onSuccess={() => setOpenJob(false)} />
      </SlideOverModal>

      {/* Update Role */}
      <SlideOverModal open={update} onOpenChange={setUpdate} title="Update role">
        {selectedJob && (
          <JobDetails
            usersData={users}
            jobs={selectedJob}
            onOpenModal={(type) => console.log(type)}
          />
        )}
      </SlideOverModal>

      {/* Suspend */}
      <Modal open={openSuspend} onOpenChange={setSuspendOpen} title="Remove team member">
        <ResolutionModal usersData={users} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      {/* Add Role */}
      <SlideOverModal open={openAddRole} onOpenChange={setOpenAddRole} title="Add role">
        <AddRoleForm onSuccess={() => setOpenAddRole(false)} />
      </SlideOverModal>

      {/* Edit Role */}
      <EditRoleSlideOver open={openEditRole} onOpenChange={setOpenEditRole} role={selectedRole} />

      {/* Delete */}
      <Modal open={openDelete} onOpenChange={setOpenDelete} title="Delete role">
        {selectedRole && <Delete usersData={selectedRole} onSuccess={() => setOpenDelete(false)} />}
      </Modal>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant="secondary"
            className={`!bg-transparent !border-0 shadow-none px-4 py-2 transition-colors rounded-none ${
              activeTab === tab.id
                ? 'text-[#017441] font-bold border-b-2 border-[#02CA71]'
                : 'text-[#757C91] font-medium hover:text-gray-700'
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Team Members */}
      {activeTab === 'team' && (
        <>
          <div className="px-6 flex items-center justify-between bg-white">
            <h1 className="font-bold text-[#3B4152]">{users.length} Jobs</h1>
            <JobsFiltersBar
              jobs={paginatedData}
              status={statusFilter}
              setStatus={setStatusFilter}
              search={search}
              setSearch={setSearch}
              onOpenJobDetails={() => setOpenJob(true)}
            />
          </div>

          <JobsTable
            jobs={paginatedData}
            onSortChange={setSortConfig}
            sortConfig={sortConfig}
            onOpenJobDetails={(job) => {
              setSelectedJob(job);
              setUpdate(true);
            }}
            handleSuspendClick={handleSuspendClick}
            onOpenModal={(type) => console.log(type)}
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

      {/* Roles */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-sm font-bold">{rolesData.length} Roles</h2>
            <WalletsFiltersBar onOpenAddRole={() => setOpenAddRole(true)} />
          </div>
          <WalletsTable
            wallet={rolesData}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
          <UsersPagination
            currentPage={currentPage}
            totalPages={Math.ceil(rolesData.length / itemsPerPage)}
            totalItems={rolesData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
