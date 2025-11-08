import type { Role, TeamMember } from '@/types/types';
import type {
  AdminPermissionItem,
  AdminPermissionModule,
  AdminRole,
  AdminRolePermission,
  AdminTeamMember,
  AdminTeamMemberRole,
} from './types';

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

function formatDateTime(value?: string | null): string {
  if (!value) {
    return '—';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return '—';
  }
  return parsed.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildName(member: AdminTeamMember): string {
  if (member.fullname && member.fullname.trim().length > 0) {
    return member.fullname.trim();
  }
  const parts = [member.firstname, member.lastname]
    .filter((part): part is string => Boolean(part && part.trim().length > 0))
    .map((part) => part.trim());
  if (parts.length > 0) {
    return parts.join(' ');
  }
  if (member.email) {
    return member.email.split('@')[0] ?? member.email;
  }
  return 'Team member';
}

function computeStatus(member: AdminTeamMember): string {
  if (member.suspended) {
    return 'Suspended';
  }
  if (member.status) {
    const normalized = member.status.toLowerCase();
    if (normalized.includes('pending')) return 'Pending';
    if (normalized.includes('suspend')) return 'Suspended';
  }
  return 'Active';
}

const ALL_PERMISSION_CODES = [
  'dashboard',
  'users',
  'users.suspend',
  'providers',
  'providers.suspend',
  'jobs',
  'disputes',
  'disputes.resolve',
  'reports',
  'reports.resolve',
  'feedback',
  'team',
  'team.manage',
  'team.edit-role',
  'team.roles.manage',
  'team.roles.edit',
  'settings',
];

const FULL_ACCESS_KEYWORDS = [
  'full',
  'full.access',
  'fullaccess',
  'full-access',
  'full_access',
  'all.permissions',
  'all-permissions',
  'all_permissions',
];

const FULL_ACCESS_COUNT_THRESHOLD = Math.max(ALL_PERMISSION_CODES.length - 2, 1);
function normalizePermissionCode(raw: string | undefined | null): string {
  if (!raw) return '';
  return raw.trim().toLowerCase().replace(/\s+/g, '_');
}

function sanitizeKey(raw: string | undefined | null, fallback: string): string {
  const normalized = normalizePermissionCode(raw)?.replace(/[^a-z0-9._-]+/g, '-');
  if (normalized && normalized.length > 0) {
    return normalized;
  }
  return fallback;
}

function toDisplayLabel(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';

  const hasUpperCase = /[A-Z]/.test(trimmed);
  if (hasUpperCase) {
    return trimmed;
  }

  return trimmed
    .split(/[\s._-]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function normalizeAdminRolePermission(permission: string | AdminRolePermission | null | undefined) {
  if (!permission) {
    return { label: '', code: '' };
  }

  if (typeof permission === 'string') {
    const code = normalizePermissionCode(permission);
    const label = toDisplayLabel(permission);
    return { label, code };
  }

  const candidates = [
    permission.code,
    permission.name,
    permission.label,
    permission.description,
  ].map((candidate) => (typeof candidate === 'string' ? candidate : ''));

  const rawCode = candidates.find((candidate) => candidate.trim().length > 0) ?? '';
  const code = normalizePermissionCode(rawCode);

  const labelCandidate =
    typeof permission.label === 'string' && permission.label.trim().length > 0
      ? permission.label
      : rawCode;
  const label = toDisplayLabel(labelCandidate);

  return { label, code };
}

export function mapAdminTeamMemberToTeamMember(member: AdminTeamMember): TeamMember {
  const name = buildName(member);
  const primaryRole = member.role ?? (Array.isArray(member.roles) ? member.roles[0] ?? null : null);
  const roleName = primaryRole?.name ?? '—';
  const jobId = member.uuid
    ? `#${member.uuid.replace(/-/g, '').slice(0, 6).toUpperCase()}`
    : '#TM0000';

  const rolePermissionsSource = primaryRole?.permissions ?? member.role?.permissions ?? [];

  return {
    jobId,
    uuid: member.uuid,
    name,
    email: member.email ?? '—',
    emailaddress: member.email ?? '—',
    role: roleName,
    status: computeStatus(member),
    avatar: (member.avatar ?? member.picture ?? '') as string,
    phone: member.phone ?? '—',
    dob: formatDate(member.dateOfBirth ?? member.updatedAt),
    date: formatDate(member.createdAt),
    lastLogin: formatDateTime(member.lastLoginAt ?? member.lastLogin),
    permissions: Array.isArray(rolePermissionsSource)
      ? rolePermissionsSource
          .map((permission) => normalizeAdminRolePermission(permission).label)
          .filter((label): label is string => Boolean(label))
      : [],
    roleUuid: primaryRole?.uuid ?? undefined,
  };
}

export function extractTeamMemberRoleOptions(
  members: AdminTeamMember[],
): Array<{ label: string; value: string }> {
  const map = new Map<string, string>();
  members.forEach((member) => {
    const roles = [] as AdminTeamMemberRole[];
    if (member.role) {
      roles.push(member.role);
    }
    if (Array.isArray(member.roles)) {
      roles.push(...member.roles);
    }

    roles.forEach((role) => {
      const uuid = role?.uuid;
      const label = role?.name;
      if (uuid && label && !map.has(uuid)) {
        map.set(uuid, label);
      }
    });
  });
  return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
}

export function mapAdminRoleToRole(role: AdminRole, fallbackIndex = 0): Role {
  const uuid = role.uuid ?? '';
  const name = role.name?.trim() ?? '';
  const permissionsRaw = Array.isArray(role.permissions) ? role.permissions : [];
  const normalizedPermissions = permissionsRaw
    .map((permission) => normalizeAdminRolePermission(permission))
    .filter((permission) => permission.label || permission.code);

  const uniquePermissions: Array<{ label: string; code: string }> = [];
  const seen = new Set<string>();
  normalizedPermissions.forEach(({ label, code }) => {
    const key = code || label;
    if (!key || seen.has(key)) {
      return;
    }
    seen.add(key);
    uniquePermissions.push({
      label: label || toDisplayLabel(code),
      code,
    });
  });

  const permissionCodes = uniquePermissions
    .map((permission) => permission.code)
    .filter((code): code is string => Boolean(code));

  const codesSet = new Set(permissionCodes);
  const hasAllKnownPermissions =
    ALL_PERMISSION_CODES.length > 0 &&
    ALL_PERMISSION_CODES.every((code) => codesSet.has(code));

  const hasExplicitFullAccess = uniquePermissions.some(({ label, code }) => {
    const normalizedLabel = label.toLowerCase();
    const normalizedCode = code ? code.toLowerCase() : '';
    return FULL_ACCESS_KEYWORDS.some((keyword) => {
      const normalizedKeyword = keyword.toLowerCase();
      const spacedKeyword = normalizedKeyword.replace(/[._-]+/g, ' ');
      return (
        (normalizedCode && normalizedCode.includes(normalizedKeyword)) ||
        normalizedLabel.includes(spacedKeyword)
      );
    });
  });

  const normalizedName = name.toLowerCase();
  const inferredFromName =
    normalizedName.includes('super admin') || normalizedName.includes('full access');

  const fullAccess =
    hasAllKnownPermissions ||
    hasExplicitFullAccess ||
    inferredFromName ||
    uniquePermissions.length >= FULL_ACCESS_COUNT_THRESHOLD;

  const permissions = uniquePermissions.map((permission) => permission.label || '—');
  const permissionCodesWithFallback = uniquePermissions.map((permission) => {
    if (permission.code) return permission.code;
    return normalizePermissionCode(permission.label) || permission.label;
  });

  const id = uuid || (name ? `role-${name.toLowerCase().replace(/\s+/g, '-')}` : `role-${fallbackIndex}`);

  return {
    id,
    title: name || 'Role',
    permissions,
    uuid: uuid || undefined,
    description: role.description,
    fullAccess,
    permissionCodes: permissionCodesWithFallback.filter(
      (code, index, list) => Boolean(code) && list.indexOf(code) === index,
    ),
  };
}

export function mapAdminRolesToSelectOptions(roles: AdminRole[]): Array<{ label: string; value: string }> {
  const map = new Map<string, string>();
  roles.forEach((role) => {
    const uuid = role.uuid;
    const name = role.name?.trim();
    if (uuid && name && !map.has(uuid)) {
      map.set(uuid, name);
    }
  });
  return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
}

export interface PermissionGroupOption {
  key: string;
  label: string;
  uuid?: string;
  modulePermissionKey?: string;
  children?: Array<{ key: string; label: string; uuid?: string; isModulePermission?: boolean }>;
}

function buildGroupKey(base: string | undefined, fallback: string): string {
  return sanitizeKey(base, fallback);
}

function buildPermissionLabel(
  permission: AdminPermissionItem | null | undefined,
  fallback: string,
  index: number,
) {
  if (!permission) {
    return fallback || `Permission ${index + 1}`;
  }

  const name = permission.name?.trim();
  if (name) {
    return name;
  }

  return fallback || `Permission ${index + 1}`;
}

function buildPermissionKey(permission: AdminPermissionItem | null | undefined, fallback: string, index: number) {
  if (!permission) {
    return sanitizeKey(null, `${fallback}-${index}`);
  }
  if (permission.code) {
    return normalizePermissionCode(permission.code);
  }
  const byName = normalizePermissionCode(permission.name);
  if (byName) {
    return byName;
  }
  return sanitizeKey(permission.module, `${fallback}-${index}`);
}

export function mapAdminPermissionsToGroups(modules: AdminPermissionModule[]): PermissionGroupOption[] {
  if (!Array.isArray(modules)) {
    return [];
  }

  const groups: PermissionGroupOption[] = [];

  modules.forEach((moduleEntry, moduleIndex) => {
    const modulePermission = moduleEntry.modulePermission ?? null;
    const moduleLabel =
      modulePermission?.name?.trim() || toDisplayLabel(moduleEntry.module ?? '') || `Module ${moduleIndex + 1}`;
    const baseGroupKey = buildGroupKey(moduleEntry.module ?? modulePermission?.code, `module-${moduleIndex}`);

    const modulePermissions = Array.isArray(moduleEntry.permissions) ? moduleEntry.permissions : [];

    const children: Array<{ key: string; label: string; uuid?: string; isModulePermission?: boolean }> = [];
    const seen = new Set<string>();
    let modulePermissionKey: string | undefined;

    const addChild = (item: AdminPermissionItem | null | undefined, index: number, fallbackLabel?: string) => {
      if (!item && !fallbackLabel) return;
      const label = buildPermissionLabel(item, fallbackLabel ?? moduleLabel, index);
      const key = buildPermissionKey(item, baseGroupKey, index);
      if (!key || seen.has(key)) {
        return;
      }
      seen.add(key);
      if (item?.isModulePermission) {
        modulePermissionKey = key;
      }
      children.push({ key, label, uuid: item?.uuid, isModulePermission: Boolean(item?.isModulePermission) });
    };

    if (modulePermission) {
      addChild(modulePermission, 0, moduleLabel);
    }

    modulePermissions.forEach((permission, idx) => {
      addChild(permission, idx + 1);
    });

    if (children.length === 0) {
      const fallbackKey = buildPermissionKey(modulePermission, baseGroupKey, 0);
      groups.push({
        key: fallbackKey,
        label: moduleLabel,
        uuid: modulePermission?.uuid,
        modulePermissionKey,
      });
      return;
    }

    groups.push({
      key: baseGroupKey,
      label: moduleLabel,
      uuid: modulePermission?.uuid,
      modulePermissionKey,
      children,
    });
  });

  return groups;
}
