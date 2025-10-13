'use client';

import React from 'react';
import { formatCurrency } from '@/features/users/utils';
import type { WalletTransaction } from '@/features/users/types';

export interface WalletTableProps {
  transactions: WalletTransaction[];
}

function formatStatus(status: string): { label: string; className: string } {
  switch (status.toUpperCase()) {
    case 'SUCCESS':
      return { label: 'Successful', className: 'text-[#0D8941]' };
    case 'FAILED':
      return { label: 'Failed', className: 'text-[#EA3829]' };
    case 'PENDING':
    default:
      return { label: 'Pending', className: 'text-[#FF8A32]' };
  }
}

function formatType(type: string): string {
  if (!type) {
    return '—';
  }
  return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
}

function formatDate(value: string): string {
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

export default function WalletTable({ transactions }: WalletTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-[#EAECF5] bg-white px-6 py-12 text-center text-sm text-[#757C91]">
        No transactions recorded.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#EAECF5] bg-white">
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#F5F6FA] text-xs font-semibold uppercase text-[#99A1B3]">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-[#47516B]">
          {transactions.map((transaction) => {
            const statusMeta = formatStatus(transaction.status);

            return (
              <tr key={transaction.uuid} className="border-t border-[#EAECF5] last:border-b-0">
                <td className="px-6 py-5 font-medium text-[#0E171A]">
                  {transaction.remark ?? 'Wallet transaction'}
                </td>
                <td className="px-6 py-5 font-semibold text-[#0E171A]">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-5 text-[#757C91]">{formatType(transaction.type)}</td>
                <td className="px-6 py-5 text-[#757C91]">{formatDate(transaction.createdAt)}</td>
                <td className="px-6 py-5">
                  <span className={`text-xs font-semibold ${statusMeta.className}`}>{statusMeta.label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
