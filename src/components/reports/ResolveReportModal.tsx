'use client';

import { useResolveReport } from '@/features/reports/hooks';
import type { ReportEntry } from '@/types/types';
import Button from '@/components/ui/Button';
import { toast } from 'sonner';

interface ResolveReportModalProps {
  report: ReportEntry;
  onCancel: () => void;
  onResolved: () => void;
}

export default function ResolveReportModal({ report, onCancel, onResolved }: ResolveReportModalProps) {
  const resolveMutation = useResolveReport();

  const handleResolve = () => {
    if (!report.uuid) {
      toast.error('Unable to resolve this report because it is missing a reference id.');
      return;
    }

    resolveMutation.mutate(report.uuid, {
      onSuccess: () => {
        toast.success('Report marked as resolved');
        onResolved();
      },
      onError: (error) => {
        toast.error(error.message || 'Unable to resolve report.');
      },
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm leading-6 text-[#3B4152]">
        You’re about to close this report. Once resolved, the case will be marked as completed and
        both participants will no longer be able to take action via this report.
      </p>

      <div className="flex items-center justify-end gap-3 border-t border-[#EAECF5] pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={resolveMutation.isPending}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleResolve}
          disabled={resolveMutation.isPending}
          className="rounded-full bg-[#0D8941] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0a6f33] disabled:cursor-not-allowed disabled:bg-[#BFDCCB] disabled:text-white/70"
        >
          {resolveMutation.isPending ? 'Resolving…' : 'Resolve report'}
        </Button>
      </div>
    </div>
  );
}
