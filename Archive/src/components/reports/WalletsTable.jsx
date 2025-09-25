'use client';
import WalletsStatusBadge from './WalletsStatusBadge';
export default function WalletsTable({ wallet }) {
  if (!wallet || wallet.length === 0) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  return (
    <div className="mx-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 uppercase text-xs text-[#757C91]  rounded-2xl">
          <tr>
            <th className="px-6 py-3   cursor-pointer">
              <span className="flex items-center gap-2">Name </span>
            </th>
            <th className="px-6 py-3  cursor-pointer">
              <span className="flex items-center gap-2"> Amount </span>
            </th>
            <th className="px-6 py-3 cursor-pointer">
              <span className="flex items-center gap-2">Type</span>
            </th>
            <th className="px-6 py-3 cursor-pointer">
              <span className="flex items-center gap-2">Date</span>
            </th>

            <th className="px-6 py-3 cursor-pointer">
              <span className="flex items-center gap-2">status</span>
            </th>
          </tr>
        </thead>
        {wallet.map((txn, idx) => (
          <tbody key={idx} className="bg-white ">
            {txn.transactions.map((walletData) => (
              <tr key={walletData.id} className="border-b border-[#D6DBE7] text-[#3B4152] text-sm">
                <td className="px-4 py-6 text-[#3B4152]">{walletData.name}</td>
                <td className="px-4 py-2 text-[#3B4152]">{walletData.amount}</td>
                <td className="px-4 py-2 text-[#3B4152]">{walletData.type}</td>
                <td className="px-4 py-2 text-[#3B4152]">{walletData.date}</td>
                <td className="px-4 py-2 text-[#3B4152]">
                  <WalletsStatusBadge status={walletData.status} />
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
