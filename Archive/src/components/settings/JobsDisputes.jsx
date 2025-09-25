'use client';

import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react'; // icons

export default function JobsDisputes({ report, onEditRole, onDeleteRole, handleDeleteClick }) {
  if (!report || report.length === 0) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  const [serviceProvider, setServiceProvider] = useState('');
  const [client, setClient] = useState('');
  const [autoBlock, setAutoBlock] = useState({}); // keep autoBlock state per jobId#index

  const disableSaveProvider = !serviceProvider;
  const disableSaveClient = !client;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // toggle autoBlock for a specific reason
  const keyFor = (jobId, index) => `${jobId}#${index}`;

  // initialize autoBlock state from dummy data
  useEffect(() => {
    const initial = {};
    report.forEach((r) => {
      r?.reportReasons?.jobReports?.forEach((jr, idx) => {
        initial[keyFor(r.jobId, idx)] = !!jr.autoBlock;
      });
    });
    setAutoBlock(initial);
  }, [report]);

  const handleToggle = (jobId, index) => {
    const k = keyFor(jobId, index);
    setAutoBlock((prev) => ({
      ...prev,
      [k]: !prev[k],
    }));
  };

  return (
    <div className="border-t border-[#F1F2F4] flex">
      {/* Service Provider side */}
      <form onSubmit={handleSubmit} className="border-r border-[#F1F2F4] w-full ">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Canceling offer by client
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

      {/* Client side */}
      <form onSubmit={handleSubmit} className=" w-full">
        <div className="px-6 py-6 space-y-3">
          <div className="border-b border-[#F1F2F4] pb-6">
            <label className="pb-4 block text-[#757C91] text-sm font-bold mb-1">
              Reporting a client
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

        {/* List client reasons */}
        <div>
          <div className="space-y-2 px-6 text-[#3B4152] font-semibold text-sm">
            {report.map((reports) => (
              <div key={reports.jobId} className="space-y-2">
                {reports.reportReasons?.jobReports?.map((jobReport, i) => {
                  const k = keyFor(reports.jobId, i);
                  const checked = !!autoBlock[k];
                  return (
                    <div key={k} className="flex justify-between items-center gap-3">
                      <div className="flex justify-between items-center w-full p-[16px] bg-[#F9F9FB] text-sm rounded-xl">
                        <p>{jobReport.reason}</p>
                        {/* Auto block switch */}
                        <label className="flex items-center gap-3 text-xs text-[#757C91]">
                          <span>{checked ? 'On' : 'Off'}</span>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => handleToggle(reports.jobId, i)}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-[#017441] transition-colors"></div>
                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
                          </div>
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteClick?.({ jobId: reports.jobId, index: i, jobReport })
                          }
                          className="bg-[#FEF6F6] w-fit p-[12px] rounded-xl flex items-center justify-center"
                        >
                          <Trash2 size={16} className="text-[#F0443A]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
