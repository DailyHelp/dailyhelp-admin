'use client';

import BaseReasonTab from './BaseReasonTab';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'DISPUTE_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'DISPUTE_PROVIDER';

export default function JobDisputeTab() {
  return (
    <BaseReasonTab
      heading="Job Dispute & Report Reasons"
      left={{
        type: CLIENT_TYPE,
        title: 'Reporting a Job Dispute (Client)',
      }}
      right={{
        type: PROVIDER_TYPE,
        title: 'Reporting a Job Dispute (Service provider)',
      }}
    />
  );
}
