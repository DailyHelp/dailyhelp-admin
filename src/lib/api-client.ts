import { getApiBaseUrl } from './env';
import { clearResetSession } from '@/features/auth/reset-session';

export interface ApiError extends Error {
  status: number;
  data?: unknown;
}

type ApiRequestOptions = RequestInit & {
  json?: unknown;
};

const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function apiRequest<TResponse>(path: string, options: ApiRequestOptions = {}) {
  const baseUrl = getApiBaseUrl();
  const targetPath = path.startsWith('/') ? path : `/${path}`;

  const { json, headers, ...rest } = options;
  const requestInit: RequestInit = {
    ...rest,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  if (json !== undefined) {
    requestInit.body = JSON.stringify(json);
  }

  const response = await fetch(`${baseUrl}${targetPath}`, requestInit);
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');

  if (!response.ok) {
    const errorBody = isJson ? await response.json().catch(() => undefined) : undefined;
    const message =
      (errorBody as { message?: string } | undefined)?.message ??
      `Request failed with status ${response.status}`;

    const error: ApiError = Object.assign(new Error(message), {
      status: response.status,
      data: errorBody,
    });

    if (response.status === 401 && typeof window !== 'undefined') {
      clearResetSession();
      try {
        localStorage.removeItem('dailyhelp-auth');
      } catch (storageError) {
        console.error(storageError);
      }
      window.location.href = '/auth/login';
    }

    throw error;
  }

  if (!isJson) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}
