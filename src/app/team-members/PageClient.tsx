'use client';

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
import Button from '@/components/ui/Button';
import { useAdminRoles, useAdminTeamMembers } from '@/features/team-members/hooks';
import {
  mapAdminTeamMemberToTeamMember,
  extractTeamMemberRoleOptions,
  mapAdminRoleToRole,
  mapAdminRolesToSelectOptions,
} from '@/features/team-members/utils';

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
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [teamPage, setTeamPage] = useState(1);
  const [rolesPage, setRolesPage] = useState(1);
  const itemsPerPage = 8;

  function useDebouncedValue<T>(value: T, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const timer = window.setTimeout(() => setDebounced(value), delay);
      return () => window.clearTimeout(timer);
    }, [value, delay]);

    return debounced;
  }

  const debouncedSearch = useDebouncedValue(search, 400);

  const { data, isLoading, error } = useAdminTeamMembers({
    page: teamPage,
    limit: itemsPerPage,
    search: debouncedSearch || undefined,
    roleUuids: roleFilter ? [roleFilter] : undefined,
  });

  const {
    data: rolesResponse,
    isLoading: isLoadingRoles,
    error: rolesError,
  } = useAdminRoles({
    page: rolesPage,
    limit: itemsPerPage,
  });

  const teamMembers = useMemo<TeamMember[]>(() => {
    return (data?.data ?? []).map(mapAdminTeamMemberToTeamMember);
  }, [data]);

  const apiRoleOptions = useMemo(
    () => mapAdminRolesToSelectOptions(rolesResponse?.data ?? []),
    [rolesResponse],
  );

  const roleOptions = useMemo(() => {
    const options =
      apiRoleOptions.length > 0 ? apiRoleOptions : extractTeamMemberRoleOptions(data?.data ?? []);
    return [{ label: 'All roles', value: '' }, ...options];
  }, [apiRoleOptions, data]);

  const roleSelectionOptions = useMemo(() => {
    if (apiRoleOptions.length > 0) {
      return apiRoleOptions;
    }
    return extractTeamMemberRoleOptions(data?.data ?? []).filter((option) => option.value);
  }, [apiRoleOptions, data]);

  const roles = useMemo<Role[]>(() => {
    const list = rolesResponse?.data ?? [];
    return list.map((role, index) => mapAdminRoleToRole(role, index));
  }, [rolesResponse]);

  const sortedMembers = useMemo(() => {
    if (!sortConfig.key) {
      return teamMembers;
    }
    const key = sortConfig.key;
    const sorted = [...teamMembers].sort((a, b) => {
      const aVal = a[key] ?? '';
      const bVal = b[key] ?? '';
      return String(aVal).localeCompare(String(bVal), undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    });
    return sortConfig.direction === 'asc' ? sorted : sorted.reverse();
  }, [teamMembers, sortConfig]);

  const totalItems =
    data?.pagination?.total !== undefined ? data.pagination.total : teamMembers.length;
  const totalPages =
    data?.pagination?.pages !== undefined
      ? Math.max(1, data.pagination.pages)
      : Math.max(1, Math.ceil((teamMembers.length || 1) / itemsPerPage));

  const rolesTotalItems =
    rolesResponse?.pagination?.total !== undefined ? rolesResponse.pagination.total : roles.length;

  const rolesTotalPages =
    rolesResponse?.pagination?.pages !== undefined
      ? Math.max(1, rolesResponse.pagination.pages)
      : Math.max(1, Math.ceil((roles.length || 1) / itemsPerPage));

  useEffect(() => {
    setTeamPage(1);
  }, [roleFilter, debouncedSearch]);

  return (
    <div className="py-6 space-y-4">
      {/* Add Member */}
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Add member">
        <AddMemberForm
          onSuccess={() => setOpenJob(false)}
          roleOptions={roleSelectionOptions}
        />
      </SlideOverModal>

      {/* Update Role */}
      <SlideOverModal open={update} onOpenChange={setUpdate} title="Update role">
        {selectedJob && (
          <JobDetails
            member={selectedJob}
            roleOptions={roleSelectionOptions}
            onSuccess={() => setUpdate(false)}
          />
        )}
      </SlideOverModal>

      {/* Suspend */}
      <Modal open={openSuspend} onOpenChange={setSuspendOpen} title="Remove team member">
        <ResolutionModal
          member={selectedUsers}
          onSuccess={() => setSuspendOpen(false)}
        />
      </Modal>

      {/* Add Role */}
      <SlideOverModal open={openAddRole} onOpenChange={setOpenAddRole} title="Add role">
        <AddRoleForm onSuccess={() => setOpenAddRole(false)} />
      </SlideOverModal>

      {/* Edit Role */}
      <EditRoleSlideOver
        open={openEditRole}
        onOpenChange={(next) => {
          setOpenEditRole(next);
          if (!next) {
            setSelectedRole(null);
          }
        }}
        role={selectedRole}
      />

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
            <h1 className="font-bold text-[#3B4152]">
              {totalItems.toLocaleString('en-US')} Team members
            </h1>
            <JobsFiltersBar
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              search={search}
              setSearch={setSearch}
              onOpenJobDetails={() => setOpenJob(true)}
              roleOptions={roleOptions}
            />
          </div>

          {error ? (
            <div className="px-6 py-10 text-center text-sm text-[#EA3829]">
              Unable to load team members. {error.message}
            </div>
          ) : isLoading && !data ? (
            <div className="px-6 py-10 text-center text-sm text-[#757C91]">
              Loading team members…
            </div>
          ) : sortedMembers.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-[#757C91]">
              No team members found.
            </div>
          ) : (
            <>
              <JobsTable
                jobs={sortedMembers}
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
                currentPage={teamPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => {
                  if (page < 1 || page > totalPages) return;
                  setTeamPage(page);
                }}
              />
            </>
          )}
        </>
      )}

      {/* Roles */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-sm font-bold">
              {rolesTotalItems.toLocaleString('en-US')} Roles
            </h2>
            <WalletsFiltersBar onOpenAddRole={() => setOpenAddRole(true)} />
          </div>
          {rolesError ? (
            <div className="px-6 py-10 text-center text-sm text-[#EA3829]">
              Unable to load roles. {rolesError.message}
            </div>
          ) : isLoadingRoles && !rolesResponse ? (
            <div className="px-6 py-10 text-center text-sm text-[#757C91]">Loading roles…</div>
          ) : roles.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-[#757C91]">No roles found.</div>
          ) : (
            <>
              <WalletsTable
                wallet={roles}
                onEditRole={(row) => {
                  setSelectedRole(row);
                  setOpenEditRole(true);
                }}
                handleDeleteClick={handleDeleteClick}
              />
              <UsersPagination
                currentPage={rolesPage}
                totalPages={rolesTotalPages}
                totalItems={rolesTotalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => {
                  if (page < 1 || page > rolesTotalPages) return;
                  setRolesPage(page);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}
