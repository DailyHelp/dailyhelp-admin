'use client';

import ChatsReport from '@/components/settings/ChatsReport';
import {
  useAdminReasonCategories,
  useCreateAdminReasonCategory,
  useDeleteAdminReasonCategory,
} from '@/features/settings/hooks';
import { toast } from 'sonner';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'REPORT_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'REPORT_PROVIDER';

interface ReasonEntry {
  uuid?: string;
  name: string;
}

function extractReasons(
  entries: ReturnType<typeof useAdminReasonCategories>['data'],
): ReasonEntry[] {
  if (!entries?.data) return [];
  const list = entries.data;
  const reasons: ReasonEntry[] = [];
  list.forEach((item) => {
    if (Array.isArray(item.reasons) && item.reasons.length > 0) {
      item.reasons.forEach((reason) => {
        if (reason?.name) {
          reasons.push({ name: reason.name, uuid: reason.uuid });
        }
      });
    } else if (item.name) {
      reasons.push({ name: item.name, uuid: item.uuid });
    }
  });
  const seen = new Set<string>();
  return reasons.filter((reason) => {
    const key = reason.uuid ?? reason.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function ChatReportTab() {
  const {
    data: clientReasonsResponse,
    isLoading: isLoadingClientReasons,
    error: clientReasonsError,
  } = useAdminReasonCategories(CLIENT_TYPE);

  const {
    data: providerReasonsResponse,
    isLoading: isLoadingProviderReasons,
    error: providerReasonsError,
  } = useAdminReasonCategories(PROVIDER_TYPE);

  const createClientReasonMutation = useCreateAdminReasonCategory(CLIENT_TYPE);
  const createProviderReasonMutation = useCreateAdminReasonCategory(PROVIDER_TYPE);
  const deleteClientReasonMutation = useDeleteAdminReasonCategory(CLIENT_TYPE);
  const deleteProviderReasonMutation = useDeleteAdminReasonCategory(PROVIDER_TYPE);

  const clientReasons = extractReasons(clientReasonsResponse);
  const providerReasons = extractReasons(providerReasonsResponse);

  const loading = isLoadingClientReasons || isLoadingProviderReasons;
  const errorMessage = clientReasonsError?.message ?? providerReasonsError?.message ?? '';

  if (loading) {
    return <p className="px-6 py-6 text-sm text-[#757C91]">Loading chat report reasons…</p>;
  }

  if (errorMessage && clientReasons.length === 0 && providerReasons.length === 0) {
    return (
      <p className="px-6 py-6 text-sm text-[#EA3829]">
        Unable to load chat report reasons. {errorMessage}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-6 pt-2">
        <h2 className="text-[#3B4152] text-lg font-bold">Chat Report Reasons</h2>
      </div>
      <ChatsReport
        clientReasons={clientReasons}
        providerReasons={providerReasons}
        onAddClientReason={async (value) => {
          try {
            await createClientReasonMutation.mutateAsync({ type: CLIENT_TYPE, name: value });
            toast.success('Reason added', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to add reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onAddProviderReason={async (value) => {
          try {
            await createProviderReasonMutation.mutateAsync({ type: PROVIDER_TYPE, name: value });
            toast.success('Reason added', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to add reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onDeleteClientReason={async (reason) => {
          if (!reason.uuid) return;
          try {
            await deleteClientReasonMutation.mutateAsync({ uuid: reason.uuid });
            toast.success('Reason deleted', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to delete reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onDeleteProviderReason={async (reason) => {
          if (!reason.uuid) return;
          try {
            await deleteProviderReasonMutation.mutateAsync({ uuid: reason.uuid });
            toast.success('Reason deleted', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to delete reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
      />
    </div>
  );
}
