import { apiRequest } from '@/lib/api-client';
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  InitiateResetPasswordPayload,
  InitiateResetPasswordResponse,
  LoginPayload,
  LoginResponse,
  ResendOtpPayload,
  ResendOtpResponse,
  ResendResetOtpPayload,
  ResendResetOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  VerifyOtpPayload,
  VerifyOtpResponse,
  VerifyResetOtpPayload,
  VerifyResetOtpResponse,
} from './types';

export async function login(payload: LoginPayload) {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to complete login.');
  }

  return response;
}

export async function verifyOtp(payload: VerifyOtpPayload) {
  const response = await apiRequest<VerifyOtpResponse>('/auth/verify-otp', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'OTP verification failed.');
  }

  return response;
}

export async function resendLoginOtp(payload: ResendOtpPayload) {
  const response = await apiRequest<ResendOtpResponse>('/auth/resend-login-otp', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to resend login code.');
  }

  return response;
}

export async function changePassword({ token, ...payload }: ChangePasswordPayload) {
  const response = await apiRequest<ChangePasswordResponse>('/auth/change-password', {
    method: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to update password.');
  }

  return response;
}

export async function initiateResetPassword(payload: InitiateResetPasswordPayload) {
  const response = await apiRequest<InitiateResetPasswordResponse>('/auth/initiate-reset-password', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to initiate password reset.');
  }

  return response;
}

export async function verifyResetOtp(payload: VerifyResetOtpPayload) {
  const response = await apiRequest<VerifyResetOtpResponse>('/auth/verify-reset-otp', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to verify reset code.');
  }

  return response;
}

export async function resendResetOtp(payload: ResendResetOtpPayload) {
  const response = await apiRequest<ResendResetOtpResponse>('/auth/resend-reset-otp', {
    method: 'POST',
    json: payload,
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to resend reset code.');
  }

  return response;
}

export async function resetPassword({ token, ...payload }: ResetPasswordPayload) {
  const response = await apiRequest<ResetPasswordResponse>('/auth/reset-password', {
    method: 'POST',
    json: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status) {
    throw new Error(response.message ?? 'Unable to reset password.');
  }

  return response;
}
