'use client';

'use client';

import WalletStatusDropdown from '../ui/WalletsStatusDropdown';

export interface WalletsFiltersBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function WalletsFiltersBar({ value, onChange }: WalletsFiltersBarProps) {
  return (
    <div className="flex gap-4">
      <WalletStatusDropdown value={value} onChange={onChange} className="w-fit" />
    </div>
  );
}
