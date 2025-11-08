import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAdminRole,
  createAdminTeamMember,
  deleteAdminRole,
  deleteAdminTeamMember,
  fetchAdminPermissions,
  fetchAdminRoles,
  fetchAdminTeamMembers,
  updateAdminRole,
  updateAdminTeamMemberRole,
} from './api';
import type {
  AdminPermissionsResponse,
  AdminRolesResponse,
  AdminTeamMembersResponse,
  CreateAdminRolePayload,
  CreateAdminTeamMemberPayload,
  UpdateAdminRolePayload,
  UpdateAdminTeamMemberRolePayload,
  FetchAdminRolesParams,
  FetchAdminTeamMembersParams,
} from './types';

export function useAdminTeamMembers(filters: FetchAdminTeamMembersParams) {
  return useQuery<AdminTeamMembersResponse, Error>({
    queryKey: ['admin-team-members', filters],
    queryFn: () => fetchAdminTeamMembers(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminRoles(filters: FetchAdminRolesParams) {
  return useQuery<AdminRolesResponse, Error>({
    queryKey: ['admin-roles', filters],
    queryFn: () => fetchAdminRoles(filters),
    placeholderData: keepPreviousData,
  });
}

export function useAdminPermissions() {
  return useQuery<AdminPermissionsResponse, Error>({
    queryKey: ['admin-permissions'],
    queryFn: () => fetchAdminPermissions(),
  });
}

export function useCreateAdminRole() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateAdminRolePayload>({
    mutationFn: (payload) => createAdminRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
    },
  });
}

export function useUpdateAdminRole() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string; payload: UpdateAdminRolePayload }>({
    mutationFn: ({ uuid, payload }) => updateAdminRole(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
  });
}

export function useDeleteAdminRole() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string }>({
    mutationFn: ({ uuid }) => deleteAdminRole(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-roles'] });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
  });
}

export function useCreateAdminTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateAdminTeamMemberPayload>({
    mutationFn: (payload) => createAdminTeamMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
  });
}

export function useUpdateAdminTeamMemberRole() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string; payload: UpdateAdminTeamMemberRolePayload }>({
    mutationFn: ({ uuid, payload }) => updateAdminTeamMemberRole(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
  });
}

export function useDeleteAdminTeamMember() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string }>({
    mutationFn: ({ uuid }) => deleteAdminTeamMember(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
  });
}
