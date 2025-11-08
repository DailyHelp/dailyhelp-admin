'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ProviderProfile } from '@/types/types';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import { reactivateProvider, suspendProvider } from '@/features/providers/api';
import { useSelectedProviderStore } from '@/features/providers/store';
import { AdminProviderStatus } from '@/features/providers/types';

export interface ProvidersSuspendProps {
  usersData: ProviderProfile;
  onSuccess?: () => void;
}

export default function Suspend({ usersData, onSuccess }: ProvidersSuspendProps) {
  const [reason, setReason] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const queryClient = useQueryClient();
  const setSelectedProvider = useSelectedProviderStore((state) => state.setSelectedProvider);

  const isCurrentlySuspended = usersData.status === 'Suspended';
  const requiresReason = !isCurrentlySuspended;
  const isSubmitDisabled = requiresReason && reason.trim().length === 0;

  const closeModal = () => {
    setReason('');
    setShowErrors(false);
    onSuccess?.();
  };

  const handleOptimisticUpdate = (nextStatus: AdminProviderStatus) => {
    setSelectedProvider((prev) => {
      if (!prev || prev.uuid !== usersData.id) {
        return prev;
      }
      return { ...prev, status: nextStatus };
    });
  };

  const suspendMutation = useMutation({
    mutationFn: async () => {
      await suspendProvider(usersData.id, reason.trim());
      handleOptimisticUpdate(AdminProviderStatus.SUSPENDED);
    },
    onSuccess: () => {
      toast.success('Provider suspended successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-provider'] });
      queryClient.invalidateQueries({ queryKey: ['admin-providers'] });
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to suspend provider');
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: async () => {
      await reactivateProvider(usersData.id);
      handleOptimisticUpdate(AdminProviderStatus.VERIFIED);
    },
    onSuccess: () => {
      toast.success('Provider reactivated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-provider'] });
      queryClient.invalidateQueries({ queryKey: ['admin-providers'] });
      closeModal();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Unable to reactivate provider');
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
          ? 'This provider is about to be reactivated. Once reactivated, they will regain access to the platform and start receiving job offers again.'
          : 'You’re about to suspend this service provider. While suspended, they cannot log in, receive jobs, or communicate with clients.'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="px-5">
          {!isCurrentlySuspended && (
            <>
              <label htmlFor="provider-suspension-reason" className="mb-2 text-sm font-semibold text-[#757C91]">
                Reason
              </label>
              <Textarea
                id="provider-suspension-reason"
                value={reason}
                placeholder="Enter reason for suspending provider"
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
                : 'Reactivate Provider'
              : suspendMutation.isPending
              ? 'Suspending...'
              : 'Suspend Provider'}
          </Button>
        </div>
      </form>
    </div>
  );
}
