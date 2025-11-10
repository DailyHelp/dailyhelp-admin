'use client';
import { Pencil, Trash2 } from 'lucide-react';
import { IconButton } from '@/components/ui';
import type { AdminJobTip } from '@/features/settings/types';

export interface JobsTipsProps {
  tips?: AdminJobTip[];
  onEditTip: (tip: AdminJobTip) => void;
  onDeleteTip?: (tip: AdminJobTip) => void;
}

export default function JobsTips({ tips = [], onEditTip, onDeleteTip }: JobsTipsProps) {
  const filteredTips = tips.filter((tip) => Boolean(tip?.title || tip?.description));

  if (!filteredTips.length) {
    return <div className="px-6 py-8 bg-white text-[#757C91]">No job tips found.</div>;
  }

  return (
    <div className="border-t border-[#D6DBE7]">
      <table className="w-1/2 text-left border-collapse">
        <tbody className="bg-white">
          {filteredTips.map((tip, index) => (
            <tr
              key={tip.uuid ?? tip.id ?? `${tip.title ?? 'tip'}-${index}`}
              className="border-b border-[#D6DBE7]"
            >
              <td className="px-4 py-5 text-[#3B4152]">
                <div>
                  <p className="text-[#3B4152] text-[16px]">{tip.title ?? 'Untitled tip'}</p>
                  <p className="text-[#757C91] text-sm">
                    {tip.description ?? 'No description provided.'}
                  </p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex gap-4 items-start">
                  <IconButton
                    aria-label="Edit tip"
                    onClick={() => onEditTip(tip)}
                    className="h-9 text-[#757C91]"
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton
                    aria-label="Delete tip"
                    onClick={() => onDeleteTip?.(tip)}
                    className="h-9 text-[#F0443A]"
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
