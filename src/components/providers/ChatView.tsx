'use client';
import Image from 'next/image';
import Button from '@/components/ui/Button';

import type { ChatThread, JobItem, ProviderProfile } from '@/types/types';

export default function ChatView({
  chat,
  jobs,
  usersData,
}: {
  chat: ChatThread[];
  jobs: JobItem;
  usersData: ProviderProfile;
}) {
  return (
    <div className=" h-[100vh] bg-[#F1F2F4] overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {chat[0].messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isOffer = msg.type === 'offer';
          const isCountered = msg.status === 'countered';

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              {/* OFFER BLOCK */}

              <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {isUser
                  ? (() => {
                      const Avatar = usersData.avatar as unknown as React.ComponentType<
                        React.SVGProps<SVGSVGElement>
                      >;
                      return <Avatar className="rounded-full w-7 h-7" />;
                    })()
                  : (() => {
                      const Icon = jobs.serviceProvider?.icon as unknown as React.ComponentType<
                        React.SVGProps<SVGSVGElement>
                      >;
                      return Icon ? <Icon className="rounded-full w-7 h-7" /> : null;
                    })()}

                {/* Bubble + time */}
                <div className="max-w-md space-y-1">
                  {/* MESSAGE BUBBLE */}
                  {msg.text && (
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm text-[#121921] ${
                        isUser ? 'bg-white ' : 'bg-[#CCFFE8] '
                      }`}
                    >
                      {isOffer && (
                        <div
                          className={`rounded-2xl border p-4 text-center ${
                            isCountered
                              ? 'bg-red-50 border-red-200 '
                              : 'bg-white border-dotted border-[#D6DBE7]'
                          }`}
                        >
                          <p
                            className={`text-xl  font-bold ${
                              isCountered ? 'line-through text-[#A9AFC2]' : ''
                            }`}
                          >
                            NGN {msg.amount}
                          </p>
                          {isCountered ? (
                            <p className="text-xs mt-1 text-red-500">× Offer countered</p>
                          ) : (
                            <div>
                              <p className="text-xs mt-1 text-[#757C91]"> Offer </p>
                              <div className="flex justify-between items-center mt-3 gap-2">
                                <Button variant="secondary" className="text-xs text-red-500">
                                  Decline
                                </Button>
                                <Button className="text-xs bg-[#C1FF1D] text-[#121921]">
                                  Accept & Pay
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      <p className="pb-2 pt-1 text-[#121921] text-xs">{msg.text}</p>

                      {/* IMAGE ATTACHMENTS */}
                      {msg.images && msg.images.length > 0 && (
                        <div className="flex gap-[2px] mt-2">
                          {msg.images.map((src, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden">
                              <Image
                                src={src}
                                alt="attachment"
                                width={100}
                                height={100}
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TIME */}
                  <p className={`text-[10px] text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.time} <span className="text-green-700">{isUser && '✓'}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
