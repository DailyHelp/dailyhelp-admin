'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react'; // icons

export default function CancelJobs({ report, onEditRole, onDeleteRole, handleDeleteClick }) {
  if (!report || report.length === 0) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  const [serviceProvider, setServiceProvider] = useState('');
  const [client, setClient] = useState('');

  const disableSaveProvider = !serviceProvider;
  const disableSaveClient = !client;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="border-t border-[#F1F2F4] flex">
      <form onSubmit={handleSubmit} className="border-r border-[#F1F2F4] w-full ">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Canceling job by client
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={serviceProvider}
                onChange={(e) => setServiceProvider(e.target.value)}
                placeholder="Add new reason"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />

              <button
                disabled={disableSaveProvider}
                className={`p-[11px] text-sm font-bold ${disableSaveProvider ? ' text-[#A9AFC2] cursor-not-allowed' : ' text-[#017441]'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2 px-6 text-[#3B4152] font-semibold text-sm">
            {report.map((reports) => (
              <div key={reports.jobId} className="flex justify-between items-center gap-3">
                <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl">
                  {reports.reportReasons?.reportingServiceProvider}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteClick?.(reports)}
                  className="bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center gap-3">
              <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#A9AFC2]">
                Other
              </p>
              <button
                type="button"
                className="bg-[#F9F9FB] w-fit p-[16px] rounded-xl flex items-center justify-center"
              >
                <Trash2 size={16} className="text-[#C0C5D6]" />
              </button>
            </div>
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit} className=" w-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Canceling job by Service provider
            </label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Add new reason"
                className="w-full p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
                required
              />

              <button
                disabled={disableSaveClient}
                className={`p-[11px] text-sm font-bold ${disableSaveClient ? ' text-[#A9AFC2] cursor-not-allowed' : ' text-[#017441]'}`}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-2 px-6 text-[#3B4152] font-semibold text-sm">
            {report.map((reports) => (
              <div key={reports.jobId} className="flex justify-between items-center gap-3">
                <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl">
                  {reports.reportReasons?.reportingClient}
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteClick?.(reports)}
                  className="bg-[#FEF6F6] w-fit p-[16px] rounded-xl flex items-center justify-center"
                >
                  <Trash2 size={16} className="text-[#F0443A]" />
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center gap-3">
              <p className="w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl text-[#A9AFC2]">
                Other
              </p>
              <button
                type="button"
                className="bg-[#F9F9FB] w-fit p-[16px] rounded-xl flex items-center justify-center"
              >
                <Trash2 size={16} className="text-[#C0C5D6]" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
