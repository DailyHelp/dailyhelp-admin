'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { reactivateUser, suspendUser } from '@/features/users/api';
import { useSelectedCustomerStore } from '@/features/users/store';
import { AdminCustomerStatus } from '@/features/users/types';
import type { UserProfile } from '@/types/types';

export interface SuspendProps {
  usersData: UserProfile;
  onSuccess?: () => void;
}

export default function Suspend({ usersData, onSuccess }: SuspendProps) {
  const [reason, setReason] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const queryClient = useQueryClient();
  const setSelectedCustomer = useSelectedCustomerStore((state) => state.setSelectedCustomer);

  const isCurrentlySuspended = usersData.status === 'Suspended';
  const requiresReason = !isCurrentlySuspended;
  const isSubmitDisabled = requiresReason && reason.trim().length === 0;

  const closeModal = () => {
    setReason('');
    setShowErrors(false);
    onSuccess?.();
  };

  const handleOptimisticUpdate = (nextStatus: AdminCustomerStatus) => {
    setSelectedCustomer((prev) => {
      if (!prev || prev.uuid !== usersData.id) {
        return prev;
      }
      return {
        ...prev,
        status: nextStatus,
      };
    });
  };

  const suspendMutation = useMutation({
    mutationFn: async () => {
      await suspendUser(usersData.id, reason.trim());
      handleOptimisticUpdate(AdminCustomerStatus.SUSPENDED);
    },
    onSuccess: () => {
      toast.success('User suspended successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-customer'] });
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to suspend user');
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: async () => {
      await reactivateUser(usersData.id);
      handleOptimisticUpdate(AdminCustomerStatus.VERIFIED);
    },
    onSuccess: () => {
      toast.success('User reactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-customer'] });
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to reactivate user');
    },
  });

  const isLoading = suspendMutation.isPending || reactivateMutation.isPending;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCurrentlySuspended) {
      reactivateMutation.mutate();
      return;
    }

    if (reason.trim().length === 0) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);

    suspendMutation.mutate();
  };

  return (
    <div>
      <p className="px-5 py-4 text-[#3B4152]">
        {isCurrentlySuspended
          ? 'This user was previously suspended and is about to be reactivated. Once reactivated, they will regain access to their account and can continue using all features.'
          : 'You’re about to suspend this client, which will block their access to the platform and prevent them from requesting or booking any services.'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="px-5">
          {!isCurrentlySuspended && (
            <>
              <label htmlFor="suspension-reason" className="mb-2 text-sm font-semibold text-[#757C91]">
                Reason
              </label>
              <Textarea
                id="suspension-reason"
                value={reason}
                placeholder="Enter reason for suspending user"
                onChange={(event) => {
                  setReason(event.target.value);
                  if (showErrors && event.target.value.trim().length > 0) {
                    setShowErrors(false);
                  }
                }}
                rows={4}
                className="mb-4 w-full rounded-lg border border-[#EAECF5] bg-[#F9F9FB] p-3 text-sm font-medium text-[#3B4152] focus:border-[#017441] focus:outline-none"
              />
              {showErrors && reason.trim().length === 0 ? (
                <p className="text-xs font-semibold text-[#EA3829]">Please provide a reason.</p>
              ) : null}
            </>
          )}
        </div>

        <div className="mt-auto flex items-center justify-end gap-3 border-t border-[#EAECF5] bg-[#F9F9FB] px-6 py-4">
          <Button type="button" onClick={closeModal} variant="secondary" disabled={isLoading}>
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isLoading || isSubmitDisabled}
            className={`${
              isCurrentlySuspended
                ? '!bg-[#0D8941] !text-white hover:!bg-[#0a6f34]'
                : '!bg-[#F0443A] !text-white hover:!bg-[#d73b2f]'
            }`}
          >
            {isCurrentlySuspended
              ? reactivateMutation.isPending
                ? 'Reactivating...'
                : 'Reactivate Client'
              : suspendMutation.isPending
              ? 'Suspending...'
              : 'Suspend Client'}
          </Button>
        </div>
      </form>
    </div>
  );
}
