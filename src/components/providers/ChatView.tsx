'use client';

import { useEffect, useMemo, useRef, type ComponentType, type SVGProps } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import type { JobItem, ProviderProfile } from '@/types/types';
import { useConversationHistory } from '@/features/users/hooks';
import { formatCurrency, normalisePictures } from '@/features/users/utils';

const PAGE_SIZE = 30;

export interface ProviderChatViewProps {
  providerUuid?: string;
  customerUuid?: string;
  job: JobItem;
  provider: ProviderProfile;
}

interface ChatBubbleProps {
  isProvider: boolean;
  bubbleColor: string;
  isOffer: boolean;
  amountDisplay: string;
  offerStatus?: string;
  messageBody: string;
  attachments: string[];
}

function getOfferMeta(isProvider: boolean, status?: string) {
  const base = {
    wrapper: 'border border-dashed border-[#D6DBE7] bg-white',
    tagColor: 'text-[#017441]',
    tagBackground: 'bg-[#E6FFF4]',
    amountClass: 'text-[#0E171A]',
  };

  switch (status) {
    case 'COUNTERED':
    case 'REJECTED':
      return {
        ...base,
        tagColor: 'text-[#EA3829]',
        tagBackground: 'bg-[#FFF1F0]',
        amountClass: 'text-[#A9AFC2] line-through',
      };
    case 'ACCEPTED':
      return {
        ...base,
        tagColor: 'text-[#0D8941]',
        tagBackground: 'bg-[#E6FFF4]',
        amountClass: 'text-[#0E171A]',
      };
    default:
      if (isProvider) {
        return {
          ...base,
          tagColor: 'text-[#FF8A32]',
          tagBackground: 'bg-[#FFF3EB]',
        };
      }
      return base;
  }
}

function ChatBubble({
  isProvider,
  bubbleColor,
  isOffer,
  amountDisplay,
  offerStatus,
  messageBody,
  attachments,
}: ChatBubbleProps) {
  if (isOffer) {
    const meta = getOfferMeta(isProvider, offerStatus);
    return (
      <div className={`space-y-3 rounded-3xl px-4 py-4 text-sm ${bubbleColor}`}>
        <div className={`rounded-3xl border px-4 py-4 ${meta.wrapper}`}>
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${meta.tagBackground} ${meta.tagColor}`}
          >
            <span>
              {offerStatus?.toUpperCase() === 'COUNTERED'
                ? '× Offer countered'
                : offerStatus?.toUpperCase() === 'REJECTED'
                ? '× Offer rejected'
                : offerStatus?.toUpperCase() === 'ACCEPTED'
                ? '✓ Offer accepted'
                : 'Offer'}
            </span>
          </div>
          <p className={`mt-2 text-2xl font-semibold ${meta.amountClass}`}>{amountDisplay}</p>
          {offerStatus?.toUpperCase() === 'ACCEPTED' ? null : (
            <div className="mt-4 flex items-center justify-between gap-2 text-xs font-semibold">
              {isProvider ? (
                <div className="flex gap-2">
                  <button className="rounded-full bg-[#0D8941] px-4 py-2 text-white">Accept</button>
                  <button className="rounded-full border border-[#EAECF5] px-4 py-2 text-[#47516B]">
                    Counter
                  </button>
                </div>
              ) : (
                <>
                  <button className="rounded-full border border-[#EAECF5] px-4 py-2 text-[#EA3829]">
                    Decline
                  </button>
                  <button className="rounded-full bg-[#C1FF1D] px-4 py-2 text-[#0E171A]">
                    Accept & Pay
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {messageBody ? <p>{messageBody}</p> : null}
        {attachments.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {attachments.map((src) => (
              <Image
                key={src}
                src={src}
                alt="Attachment"
                width={72}
                height={72}
                className="h-18 w-18 rounded-xl object-cover"
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`rounded-3xl px-4 py-3 text-sm ${bubbleColor}`}>
      {messageBody}
      {attachments.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {attachments.map((src) => (
            <Image
              key={src}
              src={src}
              alt="Attachment"
              width={72}
              height={72}
              className="h-18 w-18 rounded-xl object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function ChatView({
  providerUuid,
  customerUuid,
  job,
  provider,
}: ProviderChatViewProps) {
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

  const providerAvatarSource = provider.avatar as unknown;
  const customerAvatarSource = job.client?.icon ?? job.client?.avatar;
  const providerInitial = provider.name?.[0]?.toUpperCase() ?? 'P';
  const customerInitial = job.client?.name?.[0]?.toUpperCase() ?? 'C';

  const renderAvatar = (source: unknown, fallback: string) => {
    if (typeof source === 'string' && source.trim().length > 0) {
      return (
        <Image
          src={source}
          alt={fallback}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
        />
      );
    }

    if (typeof source === 'function') {
      const Comp = source as ComponentType<SVGProps<SVGSVGElement>>;
      return <Comp className="h-7 w-7 rounded-full" />;
    }

    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E6FFF4] text-xs font-semibold text-[#017441]">
        {fallback}
      </span>
    );
  };

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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop <= 40 && hasNextPage && !isFetchingNextPage) {
      previousHeight.current = target.scrollHeight;
      fetchNextPage();
    }
  };

  if (!providerUuid || !customerUuid) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] p-6 text-center text-sm text-[#757C91]">
        Conversation history is unavailable because the provider or customer information is missing.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] text-sm text-[#757C91]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading conversation…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-[#F4F5FA] text-sm text-[#EA3829]">
        Unable to load conversation history. {error.message}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#F4F5FA]">
      <div className="flex items-center justify-between border-b border-[#EAECF5] bg-white px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-[#0E171A]">
            {job.client?.name ?? 'Client conversation'}
          </p>
          <p className="text-xs font-medium text-[#99A1B3]">Chat history</p>
        </div>
        <p className="text-xs font-medium text-[#99A1B3]">#{job.requestId ?? job.jobId}</p>
      </div>

      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {hasNextPage ? (
          <div className="flex justify-center text-xs font-medium text-[#99A1B3]">
            {isFetchingNextPage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>Scroll up to load older messages</span>
            )}
          </div>
        ) : null}

        {messages.length === 0 ? (
          <p className="text-center text-sm text-[#757C91]">No conversation history available.</p>
        ) : (
          messages.map((message) => {
            const isProviderMessage = message.from?.uuid === providerUuid;
            const bubbleAlign = isProviderMessage ? 'items-end text-right' : 'items-start text-left';
            const bubbleColor = isProviderMessage ? 'bg-[#017441] text-white' : 'bg-white text-[#0E171A]';
            const attachments = normalisePictures(message.attachments);
            const isOffer = message.type?.toUpperCase() === 'OFFER';
            const amountDisplay =
              message.amount !== null && message.amount !== undefined
                ? formatCurrency(message.amount)
                : '₦0';

            return (
              <div key={message.uuid} className={`flex flex-col gap-2 ${bubbleAlign}`}>
                <div className="flex items-end gap-2">
                  {isProviderMessage
                    ? renderAvatar(providerAvatarSource, providerInitial)
                    : renderAvatar(customerAvatarSource, customerInitial)}
                  <ChatBubble
                    isProvider={isProviderMessage}
                    bubbleColor={bubbleColor}
                    isOffer={isOffer}
                    amountDisplay={amountDisplay}
                    offerStatus={message.status ?? undefined}
                    messageBody={message.message ?? ''}
                    attachments={attachments}
                  />
                </div>
                <p className="text-[10px] font-medium text-[#99A1B3]">
                  {new Date(message.createdAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
