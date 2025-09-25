'use client';
import type { UserProfile } from '@/types/types';

export default function VerificationInfo({ usersData }: { usersData: UserProfile }) {
  return (
    <div className="p-6 ">
      <div className="w-fit m-auto mb-6">
        {(() => {
          const PassportComp = usersData.passport as unknown as React.ComponentType<
            React.SVGProps<SVGSVGElement>
          >;
          return <PassportComp className="rounded-full" />;
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
          <p>{usersData.dob}</p>
          <p>{usersData.gender}</p>
          <p>{usersData.nin}</p>
          <p>{usersData.bvn}</p>
        </div>
      </div>
    </div>
  );
}
