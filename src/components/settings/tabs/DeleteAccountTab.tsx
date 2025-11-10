'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { IconButton } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import {
  useAdminReasonCategories,
  useCreateAdminReasonCategory,
  useDeleteAdminReasonCategory,
} from '@/features/settings/hooks';
import { fetchAdminReasonCategories } from '@/features/settings/api';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'ACCOUNT_DELETION_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'ACCOUNT_DELETION_PROVIDER';

interface Reason {
  uuid?: string;
  name: string;
}

function extractReasons(
  entries: ReturnType<typeof useAdminReasonCategories>['data'],
): Reason[] {
  if (!entries?.data) return [];
  const seen = new Set<string>();
  const reasons: Reason[] = [];
  entries.data.forEach((item) => {
    if (Array.isArray(item.reasons)) {
      item.reasons.forEach((reason) => {
        if (reason?.name) {
          const key = reason.uuid ?? reason.name;
          if (seen.has(key)) return;
          seen.add(key);
          reasons.push({ name: reason.name, uuid: reason.uuid });
        }
      });
    } else if (item?.name) {
      const key = item.uuid ?? item.name;
      if (!seen.has(key)) {
        seen.add(key);
        reasons.push({ name: item.name, uuid: item.uuid });
      }
    }
  });
  return reasons;
}

export default function DeleteAccountTab() {
  const {
    data: reasonsResponse,
    isLoading,
    error,
  } = useAdminReasonCategories(CLIENT_TYPE);

  const createClientReasonMutation = useCreateAdminReasonCategory(CLIENT_TYPE);
  const createProviderReasonMutation = useCreateAdminReasonCategory(PROVIDER_TYPE);
  const deleteClientReasonMutation = useDeleteAdminReasonCategory(CLIENT_TYPE);
  const deleteProviderReasonMutation = useDeleteAdminReasonCategory(PROVIDER_TYPE);

  const reasons = extractReasons(reasonsResponse);
  const [newReason, setNewReason] = useState('');

  if (isLoading) {
    return <p className="px-6 py-6 text-sm text-[#757C91]">Loading delete account reasons…</p>;
  }

  if (error && reasons.length === 0) {
    return (
      <p className="px-6 py-6 text-sm text-[#EA3829]">
        Unable to load delete account reasons. {error.message}
      </p>
    );
  }

  const handleAddReason = async () => {
    const trimmed = newReason.trim();
    if (!trimmed) return;
    try {
      await Promise.all([
        createClientReasonMutation.mutateAsync({ type: CLIENT_TYPE, name: trimmed }),
        createProviderReasonMutation.mutateAsync({ type: PROVIDER_TYPE, name: trimmed }),
      ]);
      toast.success('Reason added', { duration: 2000 });
      setNewReason('');
    } catch (mutationError) {
      const message =
        mutationError instanceof Error ? mutationError.message : 'Unable to add reason.';
      toast.error(message, { duration: 3000 });
    }
  };

  const handleDeleteReason = async (reason: Reason) => {
    if (!reason.uuid) {
      toast.error('Unable to delete this reason.', { duration: 2000 });
      return;
    }
    try {
      await deleteClientReasonMutation.mutateAsync({ uuid: reason.uuid });
      try {
        const providerResponse = await fetchAdminReasonCategories(PROVIDER_TYPE);
        const providerReasons = extractReasons(providerResponse);
        const providerMatch = providerReasons.find((entry) => entry.name === reason.name);
        if (providerMatch?.uuid) {
          await deleteProviderReasonMutation.mutateAsync({ uuid: providerMatch.uuid });
        }
      } catch (providerError) {
        console.error('Failed to delete provider reason', providerError);
      }
      toast.success('Reason deleted', { duration: 2000 });
    } catch (mutationError) {
      const message =
        mutationError instanceof Error ? mutationError.message : 'Unable to delete reason.';
      toast.error(message, { duration: 3000 });
    }
  };

  const disableAdd =
    !newReason.trim() ||
    createClientReasonMutation.isPending ||
    createProviderReasonMutation.isPending;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-6 pt-2">
        <h2 className="text-[#3B4152] text-lg font-bold">Delete Account Reasons</h2>
      </div>

      <div className="border-t border-[#F1F2F4] px-6 py-6 space-y-4">
        <div className="border-b border-[#F1F2F4] pb-6">
          <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
            Delete Account Reasons
          </label>
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              placeholder="Add new reason"
              className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
            />
            <Button
              type="button"
              disabled={disableAdd}
              onClick={handleAddReason}
              className={disableAdd ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {reasons.length === 0 ? (
            <p className="text-sm text-[#A9AFC2]">No reasons available.</p>
          ) : (
            reasons.map((reason) => (
              <div key={reason.uuid ?? reason.name} className="flex items-center gap-3">
                <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#3B4152]">
                  {reason.name}
                </p>
                <IconButton
                  type="button"
                  onClick={() => handleDeleteReason(reason)}
                  className="bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </IconButton>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
