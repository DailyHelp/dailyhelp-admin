import type { PaginationMeta } from '@/features/users/types';

export interface AdminTeamMemberRole {
  uuid?: string;
  name?: string;
  permissions?: string[];
}

export interface AdminTeamMember {
  uuid: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  email?: string;
  phone?: string;
  status?: string;
  suspended?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  lastLogin?: string;
  dateOfBirth?: string;
  picture?: string;
  avatar?: string;
  role?: AdminTeamMemberRole | null;
  roles?: AdminTeamMemberRole[];
}

export interface AdminTeamMembersResponse {
  status: boolean;
  data: AdminTeamMember[];
  pagination?: PaginationMeta;
}

export interface FetchAdminTeamMembersParams {
  page?: number;
  limit?: number;
  search?: string;
  roleUuids?: string[];
}

export interface AdminRolePermission {
  name?: string;
  code?: string;
  label?: string;
  description?: string;
  category?: string;
  group?: string;
  children?: AdminRolePermission[];
  [key: string]: unknown;
}

export interface AdminRole {
  uuid?: string;
  name?: string;
  description?: string;
  permissions?: Array<string | AdminRolePermission>;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminRolesResponse {
  status: boolean;
  data: AdminRole[];
  pagination?: PaginationMeta;
}

export interface FetchAdminRolesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AdminPermissionItem {
  uuid?: string;
  code?: string;
  name?: string;
  module?: string;
  description?: string;
  isModulePermission?: boolean;
}

export interface AdminPermissionModule {
  module?: string;
  modulePermission?: AdminPermissionItem | null;
  permissions?: AdminPermissionItem[];
}

export interface AdminPermissionsResponse {
  status: boolean;
  data: AdminPermissionModule[];
}

export interface CreateAdminRolePayload {
  name: string;
  description?: string;
  permissionUuids: string[];
}

export interface UpdateAdminRolePayload {
  name: string;
  description?: string;
  permissionUuids: string[];
}

export interface CreateAdminTeamMemberPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleUuid?: string;
  roleUuids?: string[];
}

export interface UpdateAdminTeamMemberRolePayload {
  roleUuid?: string;
  roleUuids?: string[];
}
