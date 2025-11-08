'use client';

import Image from 'next/image';
import type { ProviderProfile } from '@/types/types';

function renderPassport(source: ProviderProfile['passport'], name: string) {
  const maybePassport = source as unknown;
  if (typeof maybePassport === 'string' && maybePassport.trim().length > 0) {
    return (
      <Image
        src={maybePassport}
        alt={`${name} passport`}
        width={128}
        height={128}
        className="h-32 w-32 rounded-full object-cover"
      />
    );
  }
  if (typeof maybePassport === 'function') {
    const PassportComp = maybePassport as React.ComponentType<React.SVGProps<SVGSVGElement>>;
    return <PassportComp className="h-32 w-32 rounded-full" />;
  }

  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .slice(0, 2)
      .join('') || 'P';

  return (
    <span className="flex h-32 w-32 items-center justify-center rounded-full bg-[#017441]/10 text-3xl font-semibold text-[#017441]">
      {initials}
    </span>
  );
}

export default function VerificationInfo({ usersData }: { usersData: ProviderProfile }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-center">{renderPassport(usersData.passport, usersData.name)}</div>

      <div className="grid grid-cols-2 gap-y-4">
        <div className="text-[#757C91] space-y-4">
          <p>Full name</p>
          <p>Date of birth</p>
          <p>Gender</p>
          <p>NIN</p>
          <p>BVN</p>
          <p>Home address</p>
          <p>Additional info</p>
        </div>
        <div className="text-right font-semibold text-[#3B4152] space-y-4">
          <p>{usersData.name || '—'}</p>
          <p>{usersData.dob || '—'}</p>
          <p>{usersData.gender || '—'}</p>
          <p>{usersData.nin || '—'}</p>
          <p>{usersData.bvn || '—'}</p>
          <p>{usersData.address || '—'}</p>
          <p className="text-left font-normal text-sm">{usersData.direction || '—'}</p>
        </div>
      </div>
    </div>
  );
}
