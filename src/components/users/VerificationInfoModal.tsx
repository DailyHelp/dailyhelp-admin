'use client';

import React from 'react';
import Image from 'next/image';
import type { UserProfile } from '@/types/types';

export default function VerificationInfo({ usersData }: { usersData: UserProfile }) {
  return (
    <div className="p-6 ">
      <div className="w-fit m-auto mb-6">
        {(() => {
          const maybePassport = usersData.passport as unknown;
          if (maybePassport && typeof maybePassport === 'function') {
            const PassportComp = maybePassport as React.ComponentType<
              React.SVGProps<SVGSVGElement>
            >;
            return <PassportComp className="h-32 w-32 rounded-full" />;
          }
          if (typeof maybePassport === 'string' && maybePassport.trim().length > 0) {
            return <Image src={maybePassport} alt="Passport" width={128} height={128} className="h-32 w-32 rounded-full object-cover" />;
          }

          const initials = usersData.name
            .split(' ')
            .filter(Boolean)
            .map((part) => part[0]?.toUpperCase() ?? '')
            .slice(0, 2)
            .join('') || 'U';

          return (
            <span className="flex h-32 w-32 items-center justify-center rounded-full bg-[#017441]/10 text-3xl font-semibold text-[#017441]">
              {initials}
            </span>
          );
        })()}
      </div>
      <div className="grid grid-cols-2 ">
        <div className="text-[#757C91] space-y-4">
          <p>Full name</p>
          <p>Date of Birth</p>
          <p>Gender</p>
          <p>NIN</p>
          <p>BVN</p>
        </div>
        <div className="justify-self-end text-[#3B4152] font-bold space-y-4 text-end">
          <p>{usersData.name}</p>
          <p>{usersData.dob || '—'}</p>
          <p>{usersData.gender || '—'}</p>
          <p>{usersData.nin || '—'}</p>
          <p>{usersData.bvn || '—'}</p>
        </div>
      </div>
    </div>
  );
}
