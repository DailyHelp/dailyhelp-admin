'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
import type {
  AdminPermissionsResponse,
  AdminRolesResponse,
  AdminTeamMembersResponse,
  CreateAdminRolePayload,
  CreateAdminTeamMemberPayload,
  UpdateAdminTeamMemberRolePayload,
  FetchAdminRolesParams,
  FetchAdminTeamMembersParams,
  UpdateAdminRolePayload,
} from './types';

function appendParam(params: URLSearchParams, key: string, value: unknown) {
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => params.append(key, String(item)));
    return;
  }
  params.append(key, String(value));
}

export async function fetchAdminTeamMembers(
  filters: FetchAdminTeamMembersParams,
): Promise<AdminTeamMembersResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'search', filters.search);
  appendParam(params, 'roleUuids', filters.roleUuids);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminTeamMembersResponse>(`/team-members${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch team members.');
  }

  return response;
}

export async function fetchAdminRoles(filters: FetchAdminRolesParams): Promise<AdminRolesResponse> {
  const params = new URLSearchParams();
  appendParam(params, 'page', filters.page);
  appendParam(params, 'limit', filters.limit);
  appendParam(params, 'search', filters.search);

  const query = params.size > 0 ? `?${params.toString()}` : '';
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminRolesResponse>(`/roles${query}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch roles.');
  }

  return response;
}

export async function fetchAdminPermissions(): Promise<AdminPermissionsResponse> {
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminPermissionsResponse>('/permissions', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch permissions.');
  }

  return response;
}

export async function createAdminRole(payload: CreateAdminRolePayload): Promise<void> {
  const token = useAuthStore.getState().accessToken;

  await apiRequest('/roles', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function updateAdminRole(uuid: string, payload: UpdateAdminRolePayload): Promise<void> {
  if (!uuid) {
    throw new Error('Role id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/roles/${uuid}`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function deleteAdminRole(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Role id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/roles/${uuid}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function createAdminTeamMember(payload: CreateAdminTeamMemberPayload): Promise<void> {
  const token = useAuthStore.getState().accessToken;

  await apiRequest('/team-members', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function updateAdminTeamMemberRole(
  uuid: string,
  payload: UpdateAdminTeamMemberRolePayload,
): Promise<void> {
  if (!uuid) {
    throw new Error('Team member id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/team-members/${uuid}`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function deleteAdminTeamMember(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Team member id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/team-members/${uuid}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
