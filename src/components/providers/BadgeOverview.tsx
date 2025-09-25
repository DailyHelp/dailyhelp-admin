import { Check } from 'lucide-react';
import StarIcon from '@/assets/star-icon.svg';

import JobIcon from '@/assets/role-icon.svg';
import RatingIcon from '@/assets/pending-gray-icon.svg';
import type { ProviderOverview, ProviderProfile } from '@/types/types';

export default function BadgeCard({
  badges,
  usersData,
}: {
  badges?: ProviderOverview;
  usersData: ProviderProfile;
}) {
  // pick color dynamically
  const progressColor = {
    Bronze: 'bg-[#E27C00]',
    Silver: 'bg-[#B3B3B3]',
    Gold: 'bg-[#F19902]',
    Platinum: 'bg-[#AAE60A]',
  }[badges?.ratingLevel ?? 'Bronze'];

  const percent = badges?.jobsCompleted?.total
    ? (badges.jobsCompleted.done / badges.jobsCompleted.total) * 100
    : 0;

  return (
    <div className="bg-[#F9F9FB] rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {(() => {
            const Badge = usersData.badgeIcon as unknown as React.ComponentType<
              React.SVGProps<SVGSVGElement>
            >;
            return Badge ? <Badge /> : null;
          })()}
          <span className="font-semibold  text-[#121921]">{badges?.ratingLevel} rated</span>
        </div>
        <span className="text-sm text-[#757C91] font-bold">{badges?.levelTag ?? ''}</span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden h-3 mb-2">
        <div className={`h-3 rounded-full ${progressColor}`} style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-[#757C91] font-bold">{badges?.completionPercent ?? 0}% completed</p>

      {/* Jobs */}
      <div className="mt-4 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between gap-4 items-center">
          <span className="flex items-center gap-2 text-[#757C91]">
            <JobIcon />
            Jobs
          </span>
          <div className="border-t border-dotted border-[#D6DBE7] w-[100%]"></div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold">{badges?.jobsCompleted?.done ?? 0}</span>
              <span className="text-[#A9AFC2]">/{badges?.jobsCompleted?.total ?? 0}</span>
            </p>
            <RatingIcon />
          </div>
        </div>

        <div className="flex justify-between gap-4 items-center">
          <span className="flex items-center gap-2 text-[#757C91]">
            <StarIcon />
            Ratings
          </span>
          <div className="border-t border-dotted border-[#D6DBE7] w-[100%]"></div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-medium flex items-center gap-1">
                <span>{badges?.ratings?.score ?? 0}</span>
                <span className="text-[#A9AFC2]">/{badges?.ratings?.total ?? 0}</span>
                {badges?.ratings && badges.ratings.score === badges.ratings.total && (
                  <Check className="w-4 h-4 text-green-500" />
                )}
              </span>
            </p>
            <RatingIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
