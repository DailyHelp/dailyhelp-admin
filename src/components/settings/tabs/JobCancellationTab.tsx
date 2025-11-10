'use client';

import BaseReasonTab from './BaseReasonTab';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'CANCEL_JOB_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'CANCEL_JOB_PROVIDER';

export default function JobCancellationTab() {
  return (
    <BaseReasonTab
      heading="Job Cancellation Reasons"
      left={{
        type: CLIENT_TYPE,
        title: 'Cancel job by client',
      }}
      right={{
        type: PROVIDER_TYPE,
        title: 'Cancel job by service provider',
      }}
    />
  );
}
