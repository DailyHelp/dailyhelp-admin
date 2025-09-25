'use client';

import WalletStatusDropdown from '../ui/WalletsStatusDropdown';

export interface ProvidersWalletsFiltersBarProps {
  status?: string;
  setStatus?: (s: string) => void;
}

export default function WalletsFiltersBar({
  status = '',
  setStatus,
}: ProvidersWalletsFiltersBarProps) {
  return (
    <div className="flex gap-4 ">
      <WalletStatusDropdown value={status} onChange={setStatus || (() => {})} className="w-fit" />
    </div>
  );
}
