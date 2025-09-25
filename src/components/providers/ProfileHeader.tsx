'use client';
import { statusStyles, statusIcons } from '@/components/users/StatusBadge';
import DateIcon from '@/assets/dob-icon.svg';
import EmailIcon from '@/assets/email2-icon.svg';
import PhoneIcon from '@/assets/phone-icon.svg';
import VerificationIcon from '@/assets/verification-icon.svg';
import type { ProviderProfile } from '@/types/types';
import Button from '@/components/ui/Button';

export interface ProvidersProfileHeaderProps {
  usersData: ProviderProfile;
  status: string;
  onOpenVerfication: () => void;
  handleSuspendClick: (p: ProviderProfile) => void;
}

export default function ProfileHeader({
  usersData,
  status,
  onOpenVerfication,
  handleSuspendClick,
}: ProvidersProfileHeaderProps) {
  const userGender = usersData.gender;
  const getInitial = (userGender?: string) => {
    if (!userGender) return '';
    return userGender.charAt(0).toUpperCase();
  };
  return (
    <div className="flex justify-between p-4">
      <div className="bg-white   flex items-center">
        <div>
          {(() => {
            const AvatarComp = usersData.avatar as unknown as React.ComponentType<
              React.SVGProps<SVGSVGElement>
            >;
            return <AvatarComp className="rounded-full" />;
          })()}
        </div>

        <div className="">
          <div className="flex items-center gap-3 space-y-2 text-2xl">
            <h2 className="text-black  font-bold border-r-1 border-[#C0C4CD] px-2 ">
              {usersData.name}
            </h2>
            <h2 className="text-[#7C8397]">{getInitial(userGender)}</h2>
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                statusStyles[status] || 'bg-gray-100 text-gray-600'
              }`}
            >
              {statusIcons[status]}
              {status}
            </span>
          </div>

          <div className="flex px-2 space-x-6  items-center">
            <span className="flex items-center gap-3">
              <EmailIcon />
              {usersData.email && <p className="text-[#3B4152]">{usersData.email}</p>}
            </span>
            <span className="flex items-center gap-3">
              <PhoneIcon />
              <p className="text-[#3B4152]">{usersData.phone}</p>
            </span>
            <span className="flex items-center gap-3">
              <DateIcon />
              <p className="text-[#3B4152]">{usersData.dob}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button onClick={onOpenVerfication} className="flex gap-1 items-center" variant="secondary">
          <VerificationIcon /> Verification info
        </Button>

        <Button onClick={() => handleSuspendClick(usersData)}>
          {status === 'Suspended' ? 'Reactivate' : 'Suspend'}
        </Button>
      </div>
    </div>
  );
}
