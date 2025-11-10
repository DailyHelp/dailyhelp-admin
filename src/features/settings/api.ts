'use client';

import { apiRequest } from '@/lib/api-client';
import { useAuthStore } from '@/features/auth/store';
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
  AdminJobTip,
  CreateAdminJobTipPayload,
  UpdateAdminJobTipPayload,
  DeleteAdminJobTipPayload,
} from './types';

export async function fetchAdminMainCategories(): Promise<AdminMainCategoriesResponse> {
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminMainCategoriesResponse>('/main-categories', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch main categories.');
  }

  return response;
}

export async function fetchAdminMainCategorySubCategories(
  uuid: string,
): Promise<AdminMainCategorySubCategoriesResponse> {
  if (!uuid) {
    throw new Error('Main category id is required.');
  }
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminMainCategorySubCategoriesResponse>(
    `/main-category/${uuid}/sub-categories`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  if (!response.status) {
    throw new Error('Unable to fetch sub-categories.');
  }

  return response;
}

export async function updateAdminMainCategory(
  uuid: string,
  payload: UpdateAdminMainCategoryPayload,
): Promise<void> {
  if (!uuid) {
    throw new Error('Main category id is required.');
  }
  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/main-category/${uuid}/edit`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function createAdminSubCategory(
  payload: CreateAdminSubCategoryPayload,
): Promise<void> {
  if (!payload.mainCategoryUuid) {
    throw new Error('Main category id is required.');
  }
  if (!payload.name?.trim()) {
    throw new Error('Subcategory name is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest('/sub-category', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function deleteAdminSubCategory(
  uuid: string,
  payload: DeleteAdminSubCategoryPayload,
): Promise<void> {
  if (!uuid) {
    throw new Error('Subcategory id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/sub-category/${uuid}/delete`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function createAdminMainCategory(
  payload: CreateAdminMainCategoryPayload,
): Promise<void> {
  if (!payload.name?.trim()) {
    throw new Error('Category name is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest('/categories', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function fetchAdminReasonCategories(
  type?: ReasonCategoryType,
): Promise<AdminReasonCategoriesResponse> {
  const token = useAuthStore.getState().accessToken;

  const query = type ? `?type=${encodeURIComponent(type)}` : '';

  const response = await apiRequest<AdminReasonCategoriesResponse>(
    `/reason-categories${query}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    },
  );

  if (!response.status) {
    throw new Error('Unable to fetch reason categories.');
  }

  return response;
}

export async function createAdminReasonCategory(
  payload: CreateAdminReasonCategoryPayload,
): Promise<void> {
  if (!payload.type || !payload.name?.trim()) {
    throw new Error('Reason type and name are required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest('/reason-category', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function deleteAdminReasonCategory(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Reason id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/reason-category/${uuid}/delete`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export async function fetchAdminAccountTiers(): Promise<AdminAccountTiersResponse> {
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<AdminAccountTiersResponse>('/account-tiers', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.status) {
    throw new Error('Unable to fetch account tiers.');
  }

  return response;
}

export async function updateAdminAccountTier(
  uuid: string,
  payload: UpdateAdminAccountTierPayload,
): Promise<void> {
  if (!uuid) {
    throw new Error('Tier id is required.');
  }
  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/account-tiers/${uuid}`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

type RawJobTipsResponse = AdminJobTipsResponse | AdminJobTip[];

export async function fetchAdminJobTips(): Promise<AdminJobTipsResponse> {
  const token = useAuthStore.getState().accessToken;

  const response = await apiRequest<RawJobTipsResponse>('/job-tips', {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (Array.isArray(response)) {
    return { status: true, data: response };
  }

  if (!response?.status || !Array.isArray(response.data)) {
    throw new Error('Unable to fetch job tips.');
  }

  return response;
}

export async function createAdminJobTip(payload: CreateAdminJobTipPayload): Promise<void> {
  if (!payload.title?.trim() || !payload.description?.trim()) {
    throw new Error('Title and description are required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest('/job-tips', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function updateAdminJobTip(
  uuid: string,
  payload: UpdateAdminJobTipPayload,
): Promise<void> {
  if (!uuid) {
    throw new Error('Job tip id is required.');
  }

  if (!payload.title?.trim() || !payload.description?.trim()) {
    throw new Error('Title and description are required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/job-tips/${uuid}`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    json: payload,
  });
}

export async function deleteAdminJobTip(uuid: string): Promise<void> {
  if (!uuid) {
    throw new Error('Job tip id is required.');
  }

  const token = useAuthStore.getState().accessToken;

  await apiRequest(`/job-tips/${uuid}`, {
    method: 'DELETE',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}
