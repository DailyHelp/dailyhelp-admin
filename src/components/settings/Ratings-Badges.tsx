'use client';

import { forwardRef, useImperativeHandle, useMemo, useState, useEffect } from 'react';
import type { ComponentType, FormEvent } from 'react';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import BronzeIcon from '@/assets/bronze-icon.svg';
import SilverIcon from '@/assets/silver-icon.svg';
import GoldIcon from '@/assets/gold-icon.svg';
import StarIcon from '@/assets/star-icon.svg';
import { BriefcaseBusiness } from 'lucide-react';
import Input from '@/components/ui/Input';
import { useAdminAccountTiers, useUpdateAdminAccountTier } from '@/features/settings/hooks';
import type { AdminAccountTier } from '@/features/settings/types';

type TierKey = 'bronze' | 'silver' | 'gold' | 'platinum';

type TierConfig = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  subtitle: string;
  defaultJobs: string;
  defaultRating: string;
  tier: string;
  displayOrder: number;
};

const TIER_CONFIG: Record<TierKey, TierConfig> = {
  bronze: {
    icon: BronzeIcon,
    label: 'Bronze rated',
    subtitle: 'Starter level',
    defaultJobs: '0',
    defaultRating: '0',
    tier: 'BRONZE',
    displayOrder: 1,
  },
  silver: {
    icon: SilverIcon,
    label: 'Silver rated',
    subtitle: 'Skilled level',
    defaultJobs: '15',
    defaultRating: '3',
    tier: 'SILVER',
    displayOrder: 2,
  },
  gold: {
    icon: GoldIcon,
    label: 'Gold rated',
    subtitle: 'Expert level',
    defaultJobs: '50',
    defaultRating: '4',
    tier: 'GOLD',
    displayOrder: 3,
  },
  platinum: {
    icon: PlatinumIcon,
    label: 'Platinum rated',
    subtitle: 'Elite level',
    defaultJobs: '200',
    defaultRating: '5',
    tier: 'PLATINUM',
    displayOrder: 4,
  },
};

const TIER_ORDER: TierKey[] = ['bronze', 'silver', 'gold', 'platinum'];

type TierFormValue = {
  uuid?: string;
  tier?: string;
  label?: string;
  levelLabel?: string;
  description?: string;
  displayOrder?: number;
  jobs: string;
  rating: string;
};

type TierFormState = Record<TierKey, TierFormValue>;

const createDefaultTierState = (): TierFormState => {
  const state = {} as TierFormState;
  TIER_ORDER.forEach((key) => {
    const config = TIER_CONFIG[key];
    state[key] = {
      tier: config.tier,
      label: config.label,
      levelLabel: config.subtitle,
      description: '',
      displayOrder: config.displayOrder,
      jobs: config.defaultJobs,
      rating: config.defaultRating,
    };
  });
  return state;
};

const cloneTierState = (state: TierFormState): TierFormState => {
  const copy = {} as TierFormState;
  TIER_ORDER.forEach((key) => {
    copy[key] = { ...state[key] };
  });
  return copy;
};

const normalizeTierKey = (value?: string | null): TierKey | null => {
  if (!value) return null;
  const normalized = value.toLowerCase();
  if (normalized.includes('bronze')) return 'bronze';
  if (normalized.includes('silver')) return 'silver';
  if (normalized.includes('gold')) return 'gold';
  if (normalized.includes('platinum')) return 'platinum';
  return null;
};

const toStringWithFallback = (value: unknown, fallback: string): string => {
  if (value === undefined || value === null) return fallback;
  const stringValue = value.toString();
  return stringValue === '' ? fallback : stringValue;
};

const mapApiToTierState = (tiers: AdminAccountTier[]): TierFormState => {
  const base = createDefaultTierState();

  tiers.forEach((tier) => {
    const key = normalizeTierKey(tier.tier ?? tier.label ?? tier.name);
    if (!key) return;

    base[key] = {
      ...base[key],
      uuid: tier.uuid ?? base[key].uuid,
      tier: tier.tier ?? base[key].tier,
      label: tier.label ?? base[key].label,
      levelLabel: tier.levelLabel ?? base[key].levelLabel,
      description: tier.description ?? base[key].description,
      displayOrder: tier.displayOrder ?? base[key].displayOrder,
      jobs: toStringWithFallback(
        tier.minJobs ?? tier.jobsRequired,
        TIER_CONFIG[key].defaultJobs,
      ),
      rating: toStringWithFallback(
        tier.minAvgRating ?? tier.ratingRequired,
        TIER_CONFIG[key].defaultRating,
      ),
    };
  });

  return base;
};

type RatingsBadgesHandle = {
  reset: () => void;
  save: () => Promise<{ updated: number }>;
  isDirty: boolean;
};

const RatingsBadges = forwardRef<
  RatingsBadgesHandle,
  { onDirtyChange?: (dirty: boolean) => void }
>(function RatingsBadges({ onDirtyChange }, ref) {
  const { data, isLoading, error } = useAdminAccountTiers();
  const updateTierMutation = useUpdateAdminAccountTier();
  const [formState, setFormState] = useState<TierFormState>(() => createDefaultTierState());
  const [initialValues, setInitialValues] = useState<TierFormState>(() => createDefaultTierState());
  const items = data?.data ?? [];

  const isDirty = useMemo(() => {
    return TIER_ORDER.some(
      (key) =>
        formState[key].jobs !== initialValues[key].jobs ||
        formState[key].rating !== initialValues[key].rating,
    );
  }, [formState, initialValues]);

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (items.length === 0) return;
    const mapped = mapApiToTierState(items);
    setFormState(mapped);
    setInitialValues(cloneTierState(mapped));
  }, [items]);

  const reset = () => {
    setFormState(cloneTierState(initialValues));
  };

  const save = async () => {
    const changed = TIER_ORDER.filter(
      (key) =>
        formState[key].jobs !== initialValues[key].jobs ||
        formState[key].rating !== initialValues[key].rating,
    );

    if (changed.length === 0) {
      return { updated: 0 };
    }

    const missingUuid = changed.find((key) => !formState[key].uuid);
    if (missingUuid) {
      throw new Error('Unable to update some tiers. Please refresh and try again.');
    }

    const invalidEntry = changed.find((key) => {
      const entry = formState[key];
      return entry.jobs.trim() === '' || entry.rating.trim() === '';
    });

    if (invalidEntry) {
      throw new Error('Jobs and ratings are required for every tier.');
    }

    for (const key of changed) {
      const entry = formState[key];
      const config = TIER_CONFIG[key];
      const minJobs = Number(entry.jobs);
      const minAvgRating = Number(entry.rating);

      if (Number.isNaN(minJobs) || Number.isNaN(minAvgRating)) {
        throw new Error('Please enter valid numeric values for jobs and ratings.');
      }

      await updateTierMutation.mutateAsync({
        uuid: entry.uuid as string,
        payload: {
          tier: entry.tier ?? config.tier,
          label: entry.label ?? config.label,
          levelLabel: entry.levelLabel ?? config.subtitle,
          description: entry.description,
          displayOrder: entry.displayOrder ?? config.displayOrder,
          minJobs,
          minAvgRating,
        },
      });
    }

    setInitialValues(cloneTierState(formState));
    return { updated: changed.length };
  };

  useImperativeHandle(ref, () => ({ reset, save, isDirty }));

  if (isLoading) {
    return <p className="px-6 py-6 text-sm text-[#757C91]">Loading tiers…</p>;
  }

  if (error && items.length === 0) {
    return (
      <p className="px-6 py-6 text-sm text-[#EA3829]">
        Unable to load account tiers. {error.message}
      </p>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFieldChange = (tier: TierKey, field: 'jobs' | 'rating', value: string) => {
    setFormState((prev) => ({
      ...prev,
      [tier]: { ...prev[tier], [field]: value },
    }));
  };

  return (
    <div className=" p-5 grid grid-cols-2 gap-4 border-t border-[#F1F2F4] ">
      {TIER_ORDER.map((key) => {
        const config = TIER_CONFIG[key];
        const Icon = config.icon;
        const entry = formState[key];
        return (
          <div key={key} className="space-y-2 p-5 border border-[#D6DBE7] rounded-xl">
            <main className="py-2 font-semibold border-b border-[#F1F2F4] flex justify-between items-center">
              <div className="flex text-[20px] gap-2 items-center">
                <Icon className="" />
                <p className="text-[#121921] tracking-wide">{config.label}</p>
              </div>
              <p className="text-[#757C91] text-sm">{entry.levelLabel ?? config.subtitle}</p>
            </main>
            <form onSubmit={handleSubmit} className="space-y-3">
              <h2 className="py-2 text-[#757C91] uppercase font-semibold text-[14px]">Criteria</h2>

              <div className="flex gap-6">
                <label className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]">
                  <BriefcaseBusiness size={15} className="text-[#757C91]" />
                  Jobs
                </label>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={entry.jobs}
                  onChange={(e) => handleFieldChange(key, 'jobs', e.target.value)}
                  className="w-full font-bold text-[#3B4152]"
                  required
                />
              </div>

              <div className="flex gap-2">
                <label className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]">
                  <StarIcon size={15} className="text-[#757C91]" />
                  Ratings
                </label>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min={0}
                  max={5}
                  value={entry.rating}
                  onChange={(e) => handleFieldChange(key, 'rating', e.target.value)}
                  className="w-full font-bold text-[#3B4152]"
                  required
                />
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
});

export default RatingsBadges;
