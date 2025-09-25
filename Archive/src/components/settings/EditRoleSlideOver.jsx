'use client';

import SlideOverModal from '@/components/ui/SlideOverModal';
import AddRoleForm from '@/components/team-members/AddRoleForm';

// Maps a role row's permissions (labels) to AddRoleForm's leaf keys
function mapPermissionsToKeys(selectedRole) {
  if (!selectedRole) return [];
  const groups = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'users', label: 'Users', children: [{ key: 'users.suspend' }] },
    { key: 'providers', label: 'Service providers', children: [{ key: 'providers.suspend' }] },
    { key: 'jobs', label: 'Jobs' },
    { key: 'disputes', label: 'Disputes', children: [{ key: 'disputes.resolve' }] },
    { key: 'reports', label: 'Reports', children: [{ key: 'reports.resolve' }] },
    { key: 'feedback', label: 'Feedback' },
    {
      key: 'team',
      label: 'Team members',
      children: [
        { key: 'team.manage' },
        { key: 'team.edit-role' },
        { key: 'team.roles.manage' },
        { key: 'team.roles.edit' },
      ],
    },
    { key: 'settings', label: 'Settings' },
  ];

  const labelToGroup = Object.fromEntries(groups.map((g) => [g.label, g]));
  const perms = Array.isArray(selectedRole.permissions) ? selectedRole.permissions : [];
  const selectedKeys = [];
  perms.forEach((labelRaw) => {
    const label = String(labelRaw).trim();
    const g = labelToGroup[label];
    if (!g) return;
    if (g.children && g.children.length) selectedKeys.push(...g.children.map((c) => c.key));
    else selectedKeys.push(g.key);
  });
  return selectedKeys;
}

export default function EditRoleSlideOver({ open, onOpenChange, role }) {
  const initialTitle = role?.role || '';
  const initialSelectedKeys = mapPermissionsToKeys(role);

  return (
    <SlideOverModal open={open} onOpenChange={onOpenChange} title="Edit role">
      <AddRoleForm
        initialTitle={initialTitle}
        initialSelectedKeys={initialSelectedKeys}
        submitLabel="Save changes"
        onSuccess={() => onOpenChange?.(false)}
      />
    </SlideOverModal>
  );
}
