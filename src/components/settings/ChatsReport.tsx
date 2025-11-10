'use client';

import { useState } from 'react';
import { Input, Button, IconButton } from '@/components/ui';
import { Trash2 } from 'lucide-react';

interface Reason {
  uuid?: string;
  name: string;
}

interface ReasonListProps {
  title: string;
  reasons: Reason[];
  placeholder: string;
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd?: (value: string) => void;
  onDelete?: (reason: Reason) => void;
}

function ReasonList({
  title,
  reasons,
  placeholder,
  inputValue,
  onInputChange,
  onAdd,
  onDelete,
}: ReasonListProps) {
  const disableAdd = !inputValue.trim();

  return (
    <div className="border-b border-[#F1F2F4] pb-6">
      <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">{title}</label>
      <div className="flex gap-4 items-center pb-6">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
        />
        <Button
          type="button"
          disabled={disableAdd || !onAdd}
          onClick={() => {
            if (!disableAdd && onAdd) {
              onAdd(inputValue.trim());
            }
          }}
          className={disableAdd || !onAdd ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Save
        </Button>
      </div>
      <div className="space-y-2">
        {reasons.length === 0 ? (
          <p className="text-sm text-[#A9AFC2]">No reasons available.</p>
        ) : (
          reasons.map((reason) => (
            <div key={reason.uuid ?? reason.name} className="flex items-center gap-3">
              <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#3B4152]">
                {reason.name}
              </p>
              <IconButton
                type="button"
                onClick={() => onDelete?.(reason)}
                className="bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                disabled={!onDelete}
              >
                <Trash2 size={16} className="text-[#F0443A]" />
              </IconButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export interface ChatsReportProps {
  clientReasons: Reason[];
  providerReasons: Reason[];
  onAddClientReason?: (value: string) => Promise<void> | void;
  onAddProviderReason?: (value: string) => Promise<void> | void;
  onDeleteClientReason?: (reason: Reason) => Promise<void> | void;
  onDeleteProviderReason?: (reason: Reason) => Promise<void> | void;
  clientTitle?: string;
  providerTitle?: string;
  clientPlaceholder?: string;
  providerPlaceholder?: string;
}

export default function ChatsReport({
  clientReasons,
  providerReasons,
  onAddClientReason,
  onAddProviderReason,
  onDeleteClientReason,
  onDeleteProviderReason,
  clientTitle = 'Reporting a Service provider',
  providerTitle = 'Reporting a Client',
  clientPlaceholder = 'Add new reason',
  providerPlaceholder = 'Add new reason',
}: ChatsReportProps) {
  const [serviceProviderInput, setServiceProviderInput] = useState('');
  const [clientInput, setClientInput] = useState('');

  return (
    <div className="border-t border-[#F1F2F4] flex flex-col md:flex-row">
      <div className="border-b md:border-b-0 md:border-r border-[#F1F2F4] w-full px-6 py-6">
        <ReasonList
          title={clientTitle}
          reasons={clientReasons}
          placeholder={clientPlaceholder}
          inputValue={serviceProviderInput}
          onInputChange={(value) => setServiceProviderInput(value)}
          onAdd={(value) => {
            onAddClientReason?.(value);
            setServiceProviderInput('');
          }}
          onDelete={onDeleteClientReason}
        />
      </div>
      <div className="w-full px-6 py-6">
        <ReasonList
          title={providerTitle}
          reasons={providerReasons}
          placeholder={providerPlaceholder}
          inputValue={clientInput}
          onInputChange={(value) => setClientInput(value)}
          onAdd={(value) => {
            onAddProviderReason?.(value);
            setClientInput('');
          }}
          onDelete={onDeleteProviderReason}
        />
      </div>
    </div>
  );
}
