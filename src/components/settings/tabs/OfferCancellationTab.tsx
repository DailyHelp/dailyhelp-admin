'use client';

import BaseReasonTab from './BaseReasonTab';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'CANCEL_OFFER_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'CANCEL_OFFER_PROVIDER';

export default function OfferCancellationTab() {
  return (
    <BaseReasonTab
      heading="Offer Cancellation Reasons"
      left={{
        type: CLIENT_TYPE,
        title: 'Canceling offer by client',
      }}
      right={{
        type: PROVIDER_TYPE,
        title: 'Canceling offer by Service provider',
      }}
    />
  );
}
