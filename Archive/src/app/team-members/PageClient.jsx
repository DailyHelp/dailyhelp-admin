'use client';
// import { useParams } from "next/navigation";
import { teamMembersData } from '@/data/teamMembersDummyData';
import { useState, useMemo, useEffect } from 'react';
import JobsFiltersBar from '@/components/team-members/JobsFiltersBar';
import WalletsFiltersBar from '@/components/team-members/WalletsFiltersBar';
import WalletsTable from '@/components/team-members/WalletsTable';
import JobsTable from '@/components/team-members/JobsTable';
import UsersPagination from '@/components/team-members/UsersPagination';
// import Tabs from "@/components/users/Tabs";
// import ProfileHeader from "@/components/team-members/ProfileHeader";
import SlideOverModal from '@/components/ui/SlideOverModal';
import Modal from '@/components/ui/Modal';
// import VerificationInfo from "@/components/providers/VerificationInfoModal";
import Delete from '@/components/team-members/Delete.jsx';
import JobDetails from '@/components/team-members/JobDetails';
import Suspend from '@/components/team-members/ResolutionModal';
import AddMemberForm from '@/components/team-members/AddMemberForm';
import AddRoleForm from '@/components/team-members/AddRoleForm';
import EditRoleSlideOver from '@/components/team-members/EditRoleSlideOver';

export default function TeamMembersProfilePage({ id }) {
  const [update, setUpdate] = useState(false);
  const [openJob, setOpenJob] = useState(false);
  const [openSuspend, setSuspendOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddRole, setOpenAddRole] = useState(false);
  const [openEditRole, setOpenEditRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedUsers, setSelectedUsers] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const users = teamMembersData;

  const handleSuspendClick = (user) => {
    setSelectedUsers(user);
    setSuspendOpen(true);
  };
  const handleDeleteClick = (user) => {
    setSelectedUsers(user);
    setOpenDelete(true);
  };
  // --- State for tabs ---
  const [activeTab, setActiveTab] = useState('team');
  const tabs = [
    { id: 'team', label: 'Team members' },
    { id: 'roles', label: 'Roles' },
  ];
  // --- Job filtering ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
      <SlideOverModal open={openJob} onOpenChange={setOpenJob} title="Add member">
        <AddMemberForm onSuccess={() => setOpenJob(false)} />
      </SlideOverModal>

      <SlideOverModal open={update} onOpenChange={setUpdate} title="Update role">
        {selectedJob && (
          <JobDetails
            usersData={users}
            jobs={selectedJob}
            onOpenModal={(type) => setOpenModal(type)} // 👈 pass down
          />
        )}
      </SlideOverModal>

      <Modal open={openSuspend} onOpenChange={setSuspendOpen} title="Remove team member">
        <Suspend usersData={users} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      <SlideOverModal open={openAddRole} onOpenChange={setOpenAddRole} title="Add role">
        <AddRoleForm onSuccess={() => setOpenAddRole(false)} />
      </SlideOverModal>

      <EditRoleSlideOver open={openEditRole} onOpenChange={setOpenEditRole} role={selectedRole} />

      <Modal open={openDelete} onOpenChange={setOpenDelete} title="Delete role">
        <Delete usersData={users} onSuccess={() => setSuspendOpen(false)} />
      </Modal>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2  transition-colors ${
              activeTab === tab.id
                ? 'text-[#017441] font-bold border-b-2  border-[#02CA71]'
                : 'text-[#757C91] font-medium hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'team' && (
        <>
          <div className="px-6  flex items-center justify-between bg-white">
            <h1 className="font-bold text-[#3B4152]">{users.length} Jobs</h1>
            <JobsFiltersBar
              jobs={paginatedData}
              status={statusFilter}
              setStatus={setStatusFilter}
              search={search}
              setSearch={setSearch}
              onOpenJobDetails={(job) => {
                setOpenJob(true);
              }}
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
            onOpenModal={(type) => setOpenModal(type)} // 👈 pass down
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

      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-6 pt-2">
            <h2 className="text-[#3B4152] text-sm font-bold">{users.length} Roles</h2>
            <WalletsFiltersBar onOpenAddRole={() => setOpenAddRole(true)} />
          </div>
          <WalletsTable
            wallet={paginatedData}
            onEditRole={(row) => {
              setSelectedRole(row);
              setOpenEditRole(true);
            }}
            handleDeleteClick={handleDeleteClick}
          />
          <UsersPagination />
        </div>
      )}
    </div>
  );
}
