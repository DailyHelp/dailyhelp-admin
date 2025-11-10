'use client';

import ChatsReport from '@/components/settings/ChatsReport';
import {
  useAdminReasonCategories,
  useCreateAdminReasonCategory,
  useDeleteAdminReasonCategory,
} from '@/features/settings/hooks';
import type { ReasonCategoryType } from '@/features/settings/types';
import { toast } from 'sonner';

interface BaseReasonTabProps {
  heading: string;
  left: {
    type: ReasonCategoryType;
    title: string;
    placeholder?: string;
  };
  right: {
    type: ReasonCategoryType;
    title: string;
    placeholder?: string;
  };
}

interface ReasonEntry {
  uuid?: string;
  name: string;
}

function extractReasons(
  entries: ReturnType<typeof useAdminReasonCategories>['data'],
): ReasonEntry[] {
  if (!entries?.data) return [];
  const reasons: ReasonEntry[] = [];
  entries.data.forEach((item) => {
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

export default function BaseReasonTab({ heading, left, right }: BaseReasonTabProps) {
  const {
    data: leftReasonsResponse,
    isLoading: isLoadingLeft,
    error: leftError,
  } = useAdminReasonCategories(left.type);

  const {
    data: rightReasonsResponse,
    isLoading: isLoadingRight,
    error: rightError,
  } = useAdminReasonCategories(right.type);

  const createLeftReasonMutation = useCreateAdminReasonCategory(left.type);
  const createRightReasonMutation = useCreateAdminReasonCategory(right.type);
  const deleteLeftReasonMutation = useDeleteAdminReasonCategory(left.type);
  const deleteRightReasonMutation = useDeleteAdminReasonCategory(right.type);

  const leftReasons = extractReasons(leftReasonsResponse);
  const rightReasons = extractReasons(rightReasonsResponse);

  const loading = isLoadingLeft || isLoadingRight;
  const errorMessage = leftError?.message ?? rightError?.message ?? '';

  if (loading) {
    return <p className="px-6 py-6 text-sm text-[#757C91]">Loading {heading.toLowerCase()}…</p>;
  }

  if (errorMessage && leftReasons.length === 0 && rightReasons.length === 0) {
    return (
      <p className="px-6 py-6 text-sm text-[#EA3829]">
        Unable to load {heading.toLowerCase()}. {errorMessage}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-6 pt-2">
        <h2 className="text-[#3B4152] text-lg font-bold">{heading}</h2>
      </div>
      <ChatsReport
        clientTitle={left.title}
        providerTitle={right.title}
        clientPlaceholder={left.placeholder}
        providerPlaceholder={right.placeholder}
        clientReasons={leftReasons}
        providerReasons={rightReasons}
        onAddClientReason={async (value) => {
          try {
            await createLeftReasonMutation.mutateAsync({ type: left.type, name: value });
            toast.success('Reason added', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to add reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onAddProviderReason={async (value) => {
          try {
            await createRightReasonMutation.mutateAsync({ type: right.type, name: value });
            toast.success('Reason added', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to add reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onDeleteClientReason={async (reason) => {
          if (!reason.uuid) return;
          try {
            await deleteLeftReasonMutation.mutateAsync({ uuid: reason.uuid });
            toast.success('Reason deleted', { duration: 2000 });
          } catch (error) {
            const message = error instanceof Error ? error.message : 'Unable to delete reason.';
            toast.error(message, { duration: 3000 });
          }
        }}
        onDeleteProviderReason={async (reason) => {
          if (!reason.uuid) return;
          try {
            await deleteRightReasonMutation.mutateAsync({ uuid: reason.uuid });
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
