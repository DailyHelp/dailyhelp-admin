export type ResetSession = {
  token: string;
  email: string;
  type: 'login' | 'forgot';
  oldPassword?: string;
};

const STORAGE_KEY = 'dailyhelp-reset-session';

export function saveResetSession(session: ResetSession) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function readResetSession(): ResetSession | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as ResetSession;
    if (!parsed || typeof parsed.token !== 'string' || typeof parsed.email !== 'string') {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

export function clearResetSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
