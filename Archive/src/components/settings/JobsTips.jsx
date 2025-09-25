'use client';
import { Pencil, Trash2 } from 'lucide-react';

export default function JobsTips({ jobs = [], onOpenJobDetails, onEditRole, handleDeleteClick }) {
  const tips = jobs.filter((j) => j.jobTips);

  if (!tips.length) {
    return <div className="px-6 py-8 bg-white text-[#757C91]">No job tips found.</div>;
  }

  return (
    <div className="border-t border-[#D6DBE7]">
      <table className="w-1/2 text-left border-collapse">
        <tbody className="bg-white">
          {tips.map((tip) => (
            <tr key={tip.jobId} className="border-b border-[#D6DBE7]">
              <td className="px-4 py-5 text-[#3B4152]">
                <div>
                  <p className="text-[#3B4152] text-[16px]">{tip.jobTips.title}</p>
                  <p className="text-[#757C91] text-sm">{tip.jobTips.description}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex gap-4 items-start">
                  <button
                    type="button"
                    aria-label="Edit tip"
                    onClick={() => {
                      onEditRole(tip);
                      onOpenJobDetails?.(tip);
                    }}
                    className="h-9 text-[#757C91]"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Delete tip"
                    onClick={() => handleDeleteClick?.(tip)}
                    className="h-9 text-[#F0443A]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
