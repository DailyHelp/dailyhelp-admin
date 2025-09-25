'use client';

import { Plus } from 'lucide-react';

export default function WalletsFiltersBar({ onOpenAddRole }) {
  return (
    <div className="flex gap-4 ">
      <button
        className="flex items-center gap-2 text-sm bg-[#017441] text-white font-semibold py-2 px-3 rounded-xl"
        onClick={() => onOpenAddRole?.()}
      >
        <Plus size={18} />
        Add role
      </button>
    </div>
  );
}
