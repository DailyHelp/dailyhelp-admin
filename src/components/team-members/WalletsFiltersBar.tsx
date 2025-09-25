'use client';

import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function WalletsFiltersBar({ onOpenAddRole }: { onOpenAddRole?: () => void }) {
  return (
    <div className="flex gap-4 ">
      <Button onClick={() => onOpenAddRole?.()} className="flex items-center gap-2 !py-2 !px-3">
        <Plus size={18} />
        Add role
      </Button>
    </div>
  );
}
