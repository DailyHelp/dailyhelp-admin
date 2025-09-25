'use client';
import Image from 'next/image';

export default function ChatView({ chat, job }) {
  return (
    <div className="h-[100vh] bg-[#F1F2F4] overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {chat[0].messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isOffer = msg.type === 'offer';
          const isCountered = msg.status === 'countered';

          return (
            <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {isUser ? (
                  <job.reporter.icon className="rounded-full w-7 h-7" />
                ) : (
                  <job.reportedParty.icon className="rounded-full w-7 h-7" />
                )}

                {/* Message Content */}
                <div className="max-w-md space-y-1  ">
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
                                <button className="px-10 py-2 rounded-xl border border-[#D6DBE7] text-xs text-red-500 font-bold">
                                  Decline
                                </button>
                                <button className="px-7 py-2 rounded-xl bg-[#C1FF1D] text-xs font-bold">
                                  Accept & Pay
                                </button>
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
                  {/* Time */}
                  <p className={`text-[10px] text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
                    {msg.time} {isUser && <span className="text-green-700">✓</span>}
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
