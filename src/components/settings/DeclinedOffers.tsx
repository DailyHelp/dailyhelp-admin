'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react'; // icons
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import type { SettingsCategoryItem } from '@/types/types';

export default function DeclinedOffers({
  report,
  onEditRole,
  onDeleteRole,
  handleDeleteClick,
}: {
  report: SettingsCategoryItem[];
  onEditRole?: (row: any) => void;
  onDeleteRole?: (row: any) => void;
  handleDeleteClick?: (row: any) => void;
}) {
  const items = report ?? [];
  const [serviceProvider, setServiceProvider] = useState<string>('');
  const [client, setClient] = useState<string>('');

  const disableSaveProvider = !serviceProvider;
  const disableSaveClient = !client;
  const isEmpty = items.length === 0;

  if (isEmpty) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="border-t border-[#F1F2F4] flex">
      <form onSubmit={handleSubmit} className="border-r border-[#F1F2F4] w-full ">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Declining a Service provider’s offer
            </label>
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                placeholder="Add new reason"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />

              <button
                type="button"
                disabled={disableSaveProvider}
                className={`!bg-transparent !border-0 p-[11px] text-sm font-bold ${disableSaveProvider ? ' text-[#A9AFC2] cursor-not-allowed' : ' text-[#017441]'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2 px-6 text-[#3B4152] font-semibold text-sm">
            {items.map((reports) => (
              <div key={reports.jobId} className="flex justify-between items-center gap-3">
                <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl">
                  {reports.reportReasons?.reportingServiceProvider}
                </p>
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => handleDeleteClick?.(reports)}
                  className="!bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </Button>
              </div>
            ))}
            <div className="flex justify-between items-center gap-3">
              <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#A9AFC2]">
                Other
              </p>
              <Button
                type="button"
                variant="icon"
                className="!bg-[#F9F9FB] w-fit p-[16px] rounded-xl flex items-center justify-center"
              >
                <Trash2 size={16} className="text-[#C0C5D6]" />
              </Button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit} className=" w-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Declining a Client&apos;s offer
            </label>
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Add new reason"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />

              <Button
                type="button"
                variant="secondary"
                disabled={disableSaveClient}
                className={`!bg-transparent !border-0 p-[11px] text-sm font-bold ${disableSaveClient ? ' text-[#A9AFC2] cursor-not-allowed' : ' text-[#017441]'}`}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2 px-6 text-[#3B4152] font-semibold text-sm">
            {items.map((reports) => (
              <div key={reports.jobId} className="flex justify-between items-center gap-3">
                <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl">
                  {reports.reportReasons?.reportingClient}
                </p>
                <Button
                  type="button"
                  variant="icon"
                  onClick={() => handleDeleteClick?.(reports)}
                  className="!bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </Button>
              </div>
            ))}
            <div className="flex justify-between items-center gap-3">
              <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#A9AFC2]">
                Other
              </p>
              <Button
                type="button"
                variant="icon"
                className="!bg-[#F9F9FB] w-fit p-[16px] rounded-xl flex items-center justify-center"
              >
                <Trash2 size={16} className="text-[#C0C5D6]" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
