'use client';
import { Pencil, Trash2 } from 'lucide-react'; // icons
import Button from '@/components/ui/Button';
import type { Role } from '@/types/types';

interface WalletsTableProps {
  wallet: Role[];
  onEditRole: (row: Role) => void;
  handleDeleteClick: (row: Role) => void;
}

export default function WalletsTable({ wallet, onEditRole, handleDeleteClick }: WalletsTableProps) {
  if (!wallet || wallet.length === 0) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  return (
    <div className="mx-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]  rounded-2xl">
          <tr>
            <th className="px-6 py-3   cursor-pointer">
              <span className="flex items-center gap-2">Role </span>
            </th>
            <th className="px-6 py-3  cursor-pointer">
              <span className="flex items-center gap-2"> Permissions </span>
            </th>
            <th className="px-6 py-3 cursor-pointer">
              <span className="flex items-center gap-2">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {wallet.map((walletData) => (
            <tr key={walletData.id} className="border-b border-[#D6DBE7] text-[#3B4152] text-sm">
              <td className="px-4 py-6 text-[#3B4152]">{walletData.title}</td>
              <td className="px-4 py-2 text-[#3B4152]">{walletData.permissions.join(', ')}</td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-6">
                  <Button
                    type="button"
                    variant="icon"
                    aria-label="Edit member"
                    onClick={() => onEditRole?.(walletData)}
                    className="h-9 w-9 rounded-xl border border-[#D6DBE7] text-[#7C8397] hover:bg-[#F9F9FB] !bg-transparent"
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    type="button"
                    variant="icon"
                    aria-label="Delete member"
                    onClick={() => {
                      // optional external callback
                      handleDeleteClick(walletData);
                    }}
                    className="h-9 w-9 rounded-xl border border-[#D6DBE7] text-[#7C8397] hover:bg-[#F9F9FB] !bg-transparent"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
