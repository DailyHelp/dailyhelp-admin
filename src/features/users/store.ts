import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminCustomer } from './types';

type SelectedCustomerUpdater = AdminCustomer | null | ((prev: AdminCustomer | null) => AdminCustomer | null);

interface SelectedCustomerState {
  selectedCustomer: AdminCustomer | null;
  setSelectedCustomer: (customer: SelectedCustomerUpdater) => void;
}

export const useSelectedCustomerStore = create<SelectedCustomerState>()(
  persist(
    (set) => ({
      selectedCustomer: null,
      setSelectedCustomer: (customer) =>
        set((state) => ({
          selectedCustomer:
            typeof customer === 'function' ? customer(state.selectedCustomer) : customer,
        })),
    }),
    { name: 'dailyhelp-selected-customer' },
  ),
);
