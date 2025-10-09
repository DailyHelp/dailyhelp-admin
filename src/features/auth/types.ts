export interface AuthUser {
  uuid: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string;
}

export interface AuthRole {
  uuid: string;
  name: string;
  description?: string;
  isSystem?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message?: string;
  data: {
    pinId: string;
    email: string;
    otpRequired: boolean;
    accessToken?: string;
    user?: AuthUser;
    roles?: AuthRole[];
    permissions?: string[];
    requiresPasswordReset?: boolean;
  };
}

export interface VerifyOtpPayload {
  email: string;
  pinId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  status: boolean;
  message?: string;
  data: {
    accessToken: string;
    user: AuthUser;
    roles: AuthRole[];
    permissions: string[];
    requiresPasswordReset?: boolean;
  };
}

export interface ResendOtpPayload {
  email: string;
  pinId: string;
}

export interface ResendOtpResponse {
  status: boolean;
  message?: string;
  data: {
    pinId: string;
    email: string;
    otpRequired: boolean;
  };
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  token: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message?: string;
}

export interface InitiateResetPasswordPayload {
  email: string;
}

export interface InitiateResetPasswordResponse {
  status: boolean;
  message?: string;
  data: {
    pinId: string;
    email: string;
  };
}

export interface VerifyResetOtpPayload {
  email: string;
  pinId: string;
  otp: string;
}

export interface VerifyResetOtpResponse {
  status: boolean;
  message?: string;
  data: string;
}

export interface ResendResetOtpPayload {
  email: string;
  pinId: string;
}

export interface ResendResetOtpResponse {
  status: boolean;
  message?: string;
  data: {
    pinId: string;
    email: string;
  };
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  email: string;
}

export interface ResetPasswordResponse {
  status: boolean;
  message?: string;
}
