import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchAdminMainCategories,
  fetchAdminMainCategorySubCategories,
  updateAdminMainCategory,
  createAdminSubCategory,
  deleteAdminSubCategory,
  createAdminMainCategory,
  fetchAdminReasonCategories,
  createAdminReasonCategory,
  deleteAdminReasonCategory,
  fetchAdminAccountTiers,
  updateAdminAccountTier,
  fetchAdminJobTips,
  createAdminJobTip,
  updateAdminJobTip,
  deleteAdminJobTip,
} from './api';
import type {
  AdminMainCategoriesResponse,
  AdminMainCategorySubCategoriesResponse,
  UpdateAdminMainCategoryPayload,
  CreateAdminSubCategoryPayload,
  DeleteAdminSubCategoryPayload,
  CreateAdminMainCategoryPayload,
  AdminReasonCategoriesResponse,
  ReasonCategoryType,
  CreateAdminReasonCategoryPayload,
  DeleteAdminReasonCategoryPayload,
  AdminAccountTiersResponse,
  UpdateAdminAccountTierPayload,
  AdminJobTipsResponse,
  CreateAdminJobTipPayload,
  UpdateAdminJobTipPayload,
  DeleteAdminJobTipPayload,
} from './types';

export function useAdminMainCategories() {
  return useQuery<AdminMainCategoriesResponse, Error>({
    queryKey: ['admin-main-categories'],
    queryFn: fetchAdminMainCategories,
  });
}

export function useAdminMainCategorySubCategories(uuid?: string) {
  return useQuery<AdminMainCategorySubCategoriesResponse, Error>({
    queryKey: ['admin-main-category-sub-categories', uuid],
    queryFn: () => {
      if (!uuid) {
        throw new Error('Main category id is required.');
      }
      return fetchAdminMainCategorySubCategories(uuid);
    },
    enabled: Boolean(uuid),
  });
}

export function useUpdateAdminMainCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string; payload: UpdateAdminMainCategoryPayload }>({
    mutationFn: ({ uuid, payload }) => updateAdminMainCategory(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-main-categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-main-category-sub-categories'] });
    },
  });
}

export function useCreateAdminSubCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateAdminSubCategoryPayload>({
    mutationFn: (payload) => createAdminSubCategory(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-main-category-sub-categories', variables.mainCategoryUuid],
      });
    },
  });
}

export function useDeleteAdminSubCategory(mainCategoryUuid?: string) {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { uuid: string; payload: DeleteAdminSubCategoryPayload }
  >({
    mutationFn: ({ uuid, payload }) => deleteAdminSubCategory(uuid, payload),
    onSuccess: () => {
      if (mainCategoryUuid) {
        queryClient.invalidateQueries({
          queryKey: ['admin-main-category-sub-categories', mainCategoryUuid],
        });
      }
    },
  });
}

export function useCreateAdminMainCategory() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateAdminMainCategoryPayload>({
    mutationFn: (payload) => createAdminMainCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-main-categories'] });
    },
  });
}

export function useAdminReasonCategories(type?: ReasonCategoryType) {
  return useQuery<AdminReasonCategoriesResponse, Error>({
    queryKey: ['admin-reason-categories', type],
    queryFn: () => fetchAdminReasonCategories(type),
  });
}

export function useCreateAdminReasonCategory(type?: ReasonCategoryType) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateAdminReasonCategoryPayload>({
    mutationFn: (payload) => createAdminReasonCategory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reason-categories', type] });
    },
  });
}

export function useDeleteAdminReasonCategory(type?: ReasonCategoryType) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteAdminReasonCategoryPayload>({
    mutationFn: ({ uuid }) => deleteAdminReasonCategory(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reason-categories', type] });
    },
  });
}

export function useAdminAccountTiers() {
  return useQuery<AdminAccountTiersResponse, Error>({
    queryKey: ['admin-account-tiers'],
    queryFn: fetchAdminAccountTiers,
  });
}

export function useUpdateAdminAccountTier() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { uuid: string; payload: UpdateAdminAccountTierPayload }>({
    mutationFn: ({ uuid, payload }) => updateAdminAccountTier(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-account-tiers'] });
    },
  });
}

export function useAdminJobTips() {
  return useQuery<AdminJobTipsResponse, Error>({
    queryKey: ['admin-job-tips'],
    queryFn: fetchAdminJobTips,
  });
}

export function useCreateAdminJobTip() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CreateAdminJobTipPayload>({
    mutationFn: (payload) => createAdminJobTip(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-tips'] });
    },
  });
}

export function useUpdateAdminJobTip() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { uuid: string; payload: UpdateAdminJobTipPayload }>({
    mutationFn: ({ uuid, payload }) => updateAdminJobTip(uuid, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-tips'] });
    },
  });
}

export function useDeleteAdminJobTip() {
  const queryClient = useQueryClient();
  return useMutation<void, Error, DeleteAdminJobTipPayload>({
    mutationFn: ({ uuid }) => deleteAdminJobTip(uuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-job-tips'] });
    },
  });
}
