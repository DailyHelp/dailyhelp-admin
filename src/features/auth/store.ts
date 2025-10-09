import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthRole, AuthUser } from './types';

interface PendingLoginData {
  email: string;
  pinId: string;
  otpRequired: boolean;
  password?: string;
}

interface PendingForgotPasswordData {
  email: string;
  pinId: string;
}

export type PasswordResetType = 'login' | 'forgot';

interface PendingPasswordResetData {
  email: string;
  token: string;
  type: PasswordResetType;
  oldPassword?: string;
}

interface AuthState {
  pendingLogin: PendingLoginData | null;
  pendingForgotPassword: PendingForgotPasswordData | null;
  pendingPasswordReset: PendingPasswordResetData | null;
  accessToken: string | null;
  user: AuthUser | null;
  roles: AuthRole[];
  permissions: string[];
  setPendingLogin: (data: PendingLoginData) => void;
  updatePendingPin: (pinId: string) => void;
  clearPendingLogin: () => void;
  setPendingForgotPassword: (data: PendingForgotPasswordData) => void;
  updatePendingForgotPin: (pinId: string) => void;
  clearPendingForgotPassword: () => void;
  setPendingPasswordReset: (data: PendingPasswordResetData) => void;
  clearPendingPasswordReset: () => void;
  completeLogin: (payload: {
    accessToken: string;
    user: AuthUser;
    roles: AuthRole[];
    permissions: string[];
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      pendingLogin: null,
      pendingForgotPassword: null,
      pendingPasswordReset: null,
      accessToken: null,
      user: null,
      roles: [],
      permissions: [],
      setPendingLogin: (data) =>
        set({
          pendingLogin: data,
        }),
      updatePendingPin: (pinId) =>
        set((state) => {
          if (!state.pendingLogin) {
            return state;
          }

          return {
            pendingLogin: {
              ...state.pendingLogin,
              pinId,
            },
          };
        }),
      clearPendingLogin: () =>
        set({
          pendingLogin: null,
        }),
      setPendingForgotPassword: (data) =>
        set({
          pendingForgotPassword: data,
        }),
      updatePendingForgotPin: (pinId) =>
        set((state) => {
          if (!state.pendingForgotPassword) {
            return state;
          }

          return {
            pendingForgotPassword: {
              ...state.pendingForgotPassword,
              pinId,
            },
          };
        }),
      clearPendingForgotPassword: () =>
        set({
          pendingForgotPassword: null,
        }),
      setPendingPasswordReset: (data) =>
        set({
          pendingPasswordReset: data,
        }),
      clearPendingPasswordReset: () =>
        set({
          pendingPasswordReset: null,
        }),
      completeLogin: ({ accessToken, user, roles, permissions }) =>
        set({
          accessToken,
          user,
          roles,
          permissions,
          pendingLogin: null,
          pendingForgotPassword: null,
          pendingPasswordReset: null,
        }),
      logout: () =>
        set({
          pendingLogin: null,
          pendingForgotPassword: null,
          pendingPasswordReset: null,
          accessToken: null,
          user: null,
          roles: [],
          permissions: [],
        }),
    }),
    {
      name: 'dailyhelp-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        roles: state.roles,
        permissions: state.permissions,
        pendingLogin: state.pendingLogin
          ? {
              ...state.pendingLogin,
              password: undefined,
            }
          : null,
        pendingForgotPassword: state.pendingForgotPassword,
        pendingPasswordReset: state.pendingPasswordReset
          ? {
              ...state.pendingPasswordReset,
              oldPassword:
                state.pendingPasswordReset.type === 'login'
                  ? undefined
                  : state.pendingPasswordReset.oldPassword,
            }
          : null,
      }),
    },
  ),
);
