'use client';

import WalletStatusDropdown from '../ui/WalletsStatusDropdown';

export default function WalletsFiltersBar({
  status = '',
  setStatus,
}: {
  status?: string;
  setStatus?: (s: string) => void;
}) {
  return (
    <div className="flex gap-4 ">
      <WalletStatusDropdown value={status} onChange={setStatus || (() => {})} className="w-fit" />
    </div>
  );
}
