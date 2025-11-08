import type { Role } from '@/types/types';
import type { PermissionGroupOption } from './utils';

export const DEFAULT_PERMISSION_GROUPS: PermissionGroupOption[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    modulePermissionKey: 'dashboard.view',
    children: [{ key: 'dashboard.view', label: 'Dashboard', isModulePermission: true }],
  },
  {
    key: 'users',
    label: 'Users',
    modulePermissionKey: 'users.view',
    children: [
      { key: 'users.view', label: 'Users', isModulePermission: true },
      { key: 'users.suspend', label: 'Permission to suspend/unsuspend users' },
    ],
  },
  {
    key: 'providers',
    label: 'Service providers',
    modulePermissionKey: 'providers.view',
    children: [
      { key: 'providers.view', label: 'Service providers', isModulePermission: true },
      { key: 'providers.suspend', label: 'Permission to suspend/unsuspend providers' },
    ],
  },
  {
    key: 'jobs',
    label: 'Jobs',
    modulePermissionKey: 'jobs.view',
    children: [{ key: 'jobs.view', label: 'Jobs', isModulePermission: true }],
  },
  {
    key: 'disputes',
    label: 'Disputes',
    modulePermissionKey: 'disputes.view',
    children: [
      { key: 'disputes.view', label: 'Disputes', isModulePermission: true },
      { key: 'disputes.resolve', label: 'Permission to resolve disputes' },
    ],
  },
  {
    key: 'reports',
    label: 'Reports',
    modulePermissionKey: 'reports.view',
    children: [
      { key: 'reports.view', label: 'Reports', isModulePermission: true },
      { key: 'reports.resolve', label: 'Permission to resolve reports' },
    ],
  },
  {
    key: 'feedback',
    label: 'Feedback',
    modulePermissionKey: 'feedback.view',
    children: [{ key: 'feedback.view', label: 'Feedback', isModulePermission: true }],
  },
  {
    key: 'team',
    label: 'Team members',
    modulePermissionKey: 'team.view',
    children: [
      { key: 'team.view', label: 'Team members', isModulePermission: true },
      { key: 'team.manage', label: 'Permission to add/remove team members' },
      { key: 'team.edit-role', label: 'Permission to edit team member roles' },
      { key: 'team.roles.manage', label: 'Permission to add/remove roles' },
      { key: 'team.roles.edit', label: 'Permission to edit roles' },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    modulePermissionKey: 'settings.view',
    children: [{ key: 'settings.view', label: 'Settings', isModulePermission: true }],
  },
];

function buildLabelLookup(groups: PermissionGroupOption[]) {
  const map = new Map<string, string[]>();
  groups.forEach((group) => {
    const label = group.label?.trim();
    if (!label) return;
    const keys =
      group.children && group.children.length > 0
        ? group.children
            .map((child) => child.key)
            .filter((key): key is string => Boolean(key))
        : group.key
        ? [group.key]
        : [];
    if (keys.length === 0) return;
    map.set(label, keys);
  });
  return map;
}

export function mapRolePermissionsToKeys(
  role: Role | null | undefined,
  groups: PermissionGroupOption[] = DEFAULT_PERMISSION_GROUPS,
): string[] {
  if (!role) return [];
  const lookup = buildLabelLookup(groups);
  const permissions = Array.isArray(role.permissions) ? role.permissions : [];
  const selected: string[] = [];

  permissions.forEach((permission) => {
    const label = typeof permission === 'string' ? permission.trim() : '';
    if (!label) return;
    const keys = lookup.get(label);
    if (keys) {
      selected.push(...keys);
    }
  });

  return Array.from(new Set(selected));
}
