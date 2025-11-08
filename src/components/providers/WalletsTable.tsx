'use client';

import WalletsStatusBadge from './WalletsStatusBadge';
import type { WalletTransaction } from '@/features/users/types';
import { formatCurrency } from '@/features/users/utils';

export interface ProvidersWalletsTableProps {
  transactions: WalletTransaction[];
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function WalletsTable({ transactions }: ProvidersWalletsTableProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-[#EAECF5] bg-white px-6 py-12 text-center text-sm text-[#757C91]">
        No wallet transactions found.
      </div>
    );
  }

  return (
    <div className="mx-6">
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-50 text-xs font-semibold uppercase text-[#757C91]">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-[#3B4152]">
          {transactions.map((transaction) => (
            <tr key={transaction.uuid} className="border-b border-[#D6DBE7] last:border-b-0">
              <td className="px-6 py-4 font-medium text-[#0E171A]">
                {transaction.remark ?? 'Wallet transaction'}
              </td>
              <td className="px-6 py-4 font-semibold text-[#0E171A]">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4 text-[#757C91]">
                {transaction.type?.charAt(0)?.toUpperCase() + transaction.type?.slice(1).toLowerCase()}
              </td>
              <td className="px-6 py-4 text-[#757C91]">{formatDate(transaction.createdAt)}</td>
              <td className="px-6 py-4">
                <WalletsStatusBadge status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
