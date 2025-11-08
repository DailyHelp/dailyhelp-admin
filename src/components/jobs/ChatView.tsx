/* eslint-disable react/no-array-index-key */
'use client';

import {
  useEffect,
  useMemo,
  useRef,
  type ComponentType,
  type SVGProps,
  type UIEvent,
} from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useConversationHistory } from '@/features/users/hooks';
import { formatCurrency, normalisePictures } from '@/features/users/utils';
import type { JobItem } from '@/types/types';

const PAGE_SIZE = 30;

interface ChatViewProps {
  job: JobItem;
  providerUuid?: string;
  customerUuid?: string;
}

interface ChatBubbleProps {
  isCustomerMessage: boolean;
  isOffer: boolean;
  offerStatus?: string | null;
  amountDisplay: string;
  messageBody: string;
  attachments: string[];
}

interface OfferMeta {
  badgeLabel: string;
  badgeClass: string;
  wrapperClass: string;
  amountClass: string;
  showActions: boolean;
}

function getOfferMeta(isCustomerMessage: boolean, status?: string | null): OfferMeta {
  const normalized = status?.toUpperCase();

  if (normalized === 'COUNTERED' || normalized === 'REJECTED') {
    return {
      badgeLabel: normalized === 'COUNTERED' ? '× Offer countered' : '× Offer rejected',
      badgeClass: 'bg-[#FFF1F0] text-[#EA3829]',
      wrapperClass: 'border border-[#FAD1CC] bg-[#FFF7F6]',
      amountClass: 'text-[#A9AFC2] line-through',
      showActions: false,
    };
  }

  if (normalized === 'ACCEPTED') {
    return {
      badgeLabel: '✓ Offer accepted',
      badgeClass: 'bg-[#E6FFF4] text-[#017441]',
      wrapperClass: 'border border-dashed border-[#CAEBD9] bg-white',
      amountClass: 'text-[#0E171A]',
      showActions: false,
    };
  }

  return {
    badgeLabel: 'Offer',
    badgeClass: isCustomerMessage ? 'bg-[#E6FFF4] text-[#017441]' : 'bg-[#FFF3EB] text-[#FF8A32]',
    wrapperClass: 'border border-dashed border-[#D6DBE7] bg-white',
    amountClass: 'text-[#0E171A]',
    showActions: true,
  };
}

function ChatBubble({
  isCustomerMessage,
  isOffer,
  offerStatus,
  amountDisplay,
  messageBody,
  attachments,
}: ChatBubbleProps) {
  const bubbleClass = isCustomerMessage
    ? 'bg-white text-[#121921]'
    : 'bg-[#E6FFF4] text-[#121921]';

  if (isOffer) {
    const meta = getOfferMeta(isCustomerMessage, offerStatus);

    return (
      <div
        className={`space-y-4 rounded-3xl px-5 py-4 text-sm shadow-[0_12px_40px_rgba(18,25,33,0.06)] ${bubbleClass}`}
      >
        <div className={`rounded-3xl px-4 py-4 ${meta.wrapperClass}`}>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeClass}`}
          >
            <span>{meta.badgeLabel}</span>
          </div>
          <p className={`mt-3 text-2xl font-semibold ${meta.amountClass}`}>{amountDisplay}</p>

          {meta.showActions ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
              {isCustomerMessage ? (
                <>
                  <button className="rounded-full border border-[#EAECF5] px-4 py-2 text-[#EA3829]">
                    Decline
                  </button>
                  <button className="rounded-full bg-[#C1FF1D] px-4 py-2 text-[#0E171A]">
                    Accept & Pay
                  </button>
                </>
              ) : (
                <div className="flex gap-2">
                  <button className="rounded-full bg-[#0D8941] px-4 py-2 text-white">Accept</button>
                  <button className="rounded-full border border-[#EAECF5] px-4 py-2 text-[#47516B]">
                    Counter
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {messageBody ? <p className="text-sm leading-6 text-[#121921]">{messageBody}</p> : null}

        {attachments.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachments.map((src, index) => (
              <div key={`${src}-${index}`} className="h-20 w-20 overflow-hidden rounded-2xl">
                <Image src={src} alt="Attachment" width={80} height={80} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`space-y-3 rounded-3xl px-5 py-4 text-sm leading-6 shadow-[0_12px_40px_rgba(18,25,33,0.06)] ${bubbleClass}`}
    >
      {messageBody ? <p>{messageBody}</p> : null}
      {attachments.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {attachments.map((src, index) => (
            <div key={`${src}-${index}`} className="h-20 w-20 overflow-hidden rounded-2xl">
              <Image src={src} alt="Attachment" width={80} height={80} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function formatDayLabel(dateValue: string): { label: string; timestamp: number } {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return { label: dateValue, timestamp: Date.now() };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayStart = new Date(parsed);
  dayStart.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (dayStart.getTime() === today.getTime()) {
    return { label: 'Today', timestamp: dayStart.getTime() };
  }
  if (dayStart.getTime() === yesterday.getTime()) {
    return { label: 'Yesterday', timestamp: dayStart.getTime() };
  }

  return {
    label: dayStart.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    timestamp: dayStart.getTime(),
  };
}

function formatTimestamp(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed
    .toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace('AM', 'am')
    .replace('PM', 'pm');
}

function renderAvatar(source: unknown, fallback: string) {
  if (typeof source === 'string' && source.trim().length > 0) {
    return (
      <Image
        src={source}
        alt={fallback}
        width={36}
        height={36}
        className="h-9 w-9 rounded-full object-cover"
      />
    );
  }

  if (typeof source === 'function') {
    const Comp = source as ComponentType<SVGProps<SVGSVGElement>>;
    return <Comp className="h-9 w-9 rounded-full" />;
  }

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6FFF4] text-sm font-semibold text-[#017441]">
      {fallback}
    </span>
  );
}

export default function ChatView({ job, providerUuid, customerUuid }: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const previousHeight = useRef<number | null>(null);
  const initialised = useRef(false);

  const isQueryEnabled = Boolean(providerUuid && customerUuid);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useConversationHistory(
    {
      providerUuid,
      customerUuid: customerUuid ?? '',
      limit: PAGE_SIZE,
    },
    { enabled: isQueryEnabled },
  );

  const messages = useMemo(() => {
    const pages = data?.pages ?? [];
    const all = pages.flatMap((page) => page.data ?? []);
    return all.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [data]);

  const groupedMessages = useMemo(() => {
    if (messages.length === 0) {
      return [];
    }

    const groups = new Map<
      number,
      { label: string; items: typeof messages }
    >();

    messages.forEach((message) => {
      const { label, timestamp } = formatDayLabel(message.createdAt);
      if (!groups.has(timestamp)) {
        groups.set(timestamp, { label, items: [] });
      }
      groups.get(timestamp)?.items.push(message);
    });

    return Array.from(groups.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([timestamp, { label, items }]) => ({
        key: timestamp,
        label,
        items: items.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        ),
      }));
  }, [messages]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }

    if (!initialised.current && messages.length > 0) {
      container.scrollTop = container.scrollHeight;
      initialised.current = true;
      return;
    }

    if (previousHeight.current !== null) {
      const diff = container.scrollHeight - previousHeight.current;
      container.scrollTop = diff;
      previousHeight.current = null;
    }
  }, [messages]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop <= 40 && hasNextPage && !isFetchingNextPage) {
      previousHeight.current = target.scrollHeight;
      fetchNextPage();
    }
  };

  if (!providerUuid || !customerUuid) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] px-6 text-center text-sm text-[#757C91]">
        Conversation history is unavailable because the customer or provider information is
        missing.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] text-sm text-[#757C91]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Loading conversation…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] px-6 text-center text-sm text-[#EA3829]">
        Unable to load conversation history. {error.message}
      </div>
    );
  }

  const customerAvatar = job.client?.icon;
  const providerAvatar = job.serviceProvider?.icon;
  const customerInitial = job.client?.name?.[0]?.toUpperCase() ?? 'C';
  const providerInitial = job.serviceProvider?.name?.[0]?.toUpperCase() ?? 'P';

  return (
    <div className="flex h-full flex-col bg-[#F4F5FA]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 space-y-6 overflow-y-auto px-4 py-6"
      >
        {hasNextPage ? (
          <div className="flex justify-center text-xs font-medium text-[#99A1B3]">
            {isFetchingNextPage ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <span>Scroll up to load older messages</span>
            )}
          </div>
        ) : null}

        {groupedMessages.length === 0 ? (
          <p className="text-center text-sm text-[#757C91]">
            No conversation history available for this job yet.
          </p>
        ) : (
          groupedMessages.map((group) => (
            <div key={group.key} className="space-y-4">
              <div className="flex justify-center">
                <span className="rounded-full bg-white px-4 py-1 text-xs font-semibold text-[#99A1B3] shadow-[0_8px_24px_rgba(18,25,33,0.08)]">
                  {group.label}
                </span>
              </div>

              {group.items.map((message) => {
                const isCustomerMessage = message.from?.uuid === customerUuid;
                const alignClass = isCustomerMessage ? 'items-end text-right' : 'items-start text-left';
                const rowClass = isCustomerMessage ? 'flex-row-reverse' : 'flex-row';
                const attachments = normalisePictures(message.attachments);
                const isOffer = message.type?.toUpperCase() === 'OFFER';
                const amountDisplay = formatCurrency(message.amount ?? null);

                return (
                  <div key={message.uuid} className={`flex flex-col gap-2 ${alignClass}`}>
                    <div className={`flex items-end gap-3 ${rowClass}`}>
                      {isCustomerMessage
                        ? renderAvatar(customerAvatar, customerInitial)
                        : renderAvatar(providerAvatar, providerInitial)}
                      <ChatBubble
                        isCustomerMessage={isCustomerMessage}
                        isOffer={isOffer}
                        offerStatus={message.status}
                        amountDisplay={amountDisplay}
                        messageBody={message.message ?? ''}
                        attachments={attachments}
                      />
                    </div>
                    <p className="text-[11px] font-medium text-[#99A1B3]">
                      {formatTimestamp(message.createdAt)}
                    </p>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
