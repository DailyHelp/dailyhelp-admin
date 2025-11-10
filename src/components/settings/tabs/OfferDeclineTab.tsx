'use client';

import BaseReasonTab from './BaseReasonTab';
import type { ReasonCategoryType } from '@/features/settings/types';

const CLIENT_TYPE: ReasonCategoryType = 'DECLINE_OFFER_CLIENT';
const PROVIDER_TYPE: ReasonCategoryType = 'DECLINE_OFFER_PROVIDER';

export default function OfferDeclineTab() {
  return (
    <BaseReasonTab
      heading="Offer Decline Reasons"
      left={{
        type: CLIENT_TYPE,
        title: "Declining a service provider's offer",
      }}
      right={{
        type: PROVIDER_TYPE,
        title: "Declining a client's offer",
      }}
    />
  );
}
