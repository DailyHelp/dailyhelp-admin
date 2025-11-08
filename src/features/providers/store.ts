import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminProvider } from './types';

type SelectedProviderUpdater =
  | AdminProvider
  | null
  | ((prev: AdminProvider | null) => AdminProvider | null);

interface SelectedProviderState {
  selectedProvider: AdminProvider | null;
  setSelectedProvider: (provider: SelectedProviderUpdater) => void;
}

export const useSelectedProviderStore = create<SelectedProviderState>()(
  persist(
    (set) => ({
      selectedProvider: null,
      setSelectedProvider: (provider) =>
        set((state) => ({
          selectedProvider:
            typeof provider === 'function' ? provider(state.selectedProvider) : provider,
        })),
    }),
    { name: 'dailyhelp-selected-provider' },
  ),
);
