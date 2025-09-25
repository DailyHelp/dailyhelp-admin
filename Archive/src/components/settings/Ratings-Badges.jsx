'use client';

import { forwardRef, useImperativeHandle, useMemo, useState, useEffect } from 'react';
import PlatinumIcon from '@/assets/platinum-icon.svg';
import BronzeIcon from '@/assets/bronze-icon.svg';
import SilverIcon from '@/assets/silver-icon.svg';
import GoldIcon from '@/assets/gold-icon.svg';
import StarIcon from '@/assets/star-icon.svg';
import { BriefcaseBusiness } from 'lucide-react';

const DEFAULTS = {
  bronzeJobs: '0',
  bronzeRated: '0',
  silverJobs: '15',
  silverRated: '3',
  goldJobs: '50',
  goldRated: '4',
  platinumJobs: '200',
  platinumRated: '5',
};

const RatingsBadges = forwardRef(function RatingsBadges({ report, onDirtyChange }, ref) {
  if (!report || report.length === 0) {
    return <p className="text-gray-500">No wallet transactions found</p>;
  }

  const [bronzeJobs, setBronzeJobs] = useState(DEFAULTS.bronzeJobs);
  const [bronzeRated, setBronzeRated] = useState(DEFAULTS.bronzeRated);

  const [silverJobs, setSilverJobs] = useState(DEFAULTS.silverJobs);
  const [silverRated, setSilverRated] = useState(DEFAULTS.silverRated);

  const [goldJobs, setGoldJobs] = useState(DEFAULTS.goldJobs);
  const [goldRated, setGoldRated] = useState(DEFAULTS.goldRated);

  const [platinumJobs, setPlatinumJobs] = useState(DEFAULTS.platinumJobs);
  const [platinumRated, setPlatinumRated] = useState(DEFAULTS.platinumRated);

  const values = useMemo(
    () => ({
      bronzeJobs,
      bronzeRated,
      silverJobs,
      silverRated,
      goldJobs,
      goldRated,
      platinumJobs,
      platinumRated,
    }),
    [
      bronzeJobs,
      bronzeRated,
      silverJobs,
      silverRated,
      goldJobs,
      goldRated,
      platinumJobs,
      platinumRated,
    ],
  );

  const isDirty = useMemo(() => JSON.stringify(values) !== JSON.stringify(DEFAULTS), [values]);

  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  const reset = () => {
    setBronzeJobs(DEFAULTS.bronzeJobs);
    setBronzeRated(DEFAULTS.bronzeRated);
    setSilverJobs(DEFAULTS.silverJobs);
    setSilverRated(DEFAULTS.silverRated);
    setGoldJobs(DEFAULTS.goldJobs);
    setGoldRated(DEFAULTS.goldRated);
    setPlatinumJobs(DEFAULTS.platinumJobs);
    setPlatinumRated(DEFAULTS.platinumRated);
  };

  const save = () => {
    // Placeholder: integrate API call here if available
    // Returning values so parent can handle persistence if needed
    return values;
  };

  useImperativeHandle(ref, () => ({ reset, save, isDirty }));

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className=" p-5 grid grid-cols-2 gap-4 border-t border-[#F1F2F4] ">
      <div className="space-y-2 p-5 border border-[#D6DBE7] rounded-xl">
        <main className="py-2 font-semibold border-b border-[#F1F2F4] flex justify-between items-center">
          <div className="flex text-[20px] gap-2 items-center">
            <BronzeIcon className="" />
            <p className="text-[#121921] tracking-wide">Bronze rated</p>
          </div>
          <p className="text-[#757C91] text-sm">Starter level</p>
        </main>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="py-2 text-[#757C91] uppercase font-semibold text-[14px]">Criteria</h2>

          <div className="flex gap-6">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <BriefcaseBusiness size={15} className="text-[#757C91] " />
              Jobs
            </label>
            <input
              type="text"
              value={bronzeJobs}
              onChange={(e) => setBronzeJobs(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <StarIcon size={15} className="text-[#757C91] " />
              Ratings
            </label>
            <input
              type="text"
              value={bronzeRated}
              onChange={(e) => setBronzeRated(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>
        </form>
      </div>

      <div className="space-y-2 p-5 border border-[#D6DBE7] rounded-xl">
        <main className="py-2 font-semibold border-b border-[#F1F2F4] flex justify-between items-center">
          <div className="flex text-[20px] gap-2 items-center">
            <SilverIcon className="" />
            <p className="text-[#121921] tracking-wide">Silver rated</p>
          </div>
          <p className="text-[#757C91] text-sm">Skilled level</p>
        </main>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="py-2 text-[#757C91] uppercase font-semibold text-[14px]">Criteria</h2>

          <div className="flex gap-6">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <BriefcaseBusiness size={15} className="text-[#757C91] " />
              Jobs
            </label>
            <input
              type="text"
              value={silverJobs}
              onChange={(e) => setSilverJobs(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <StarIcon size={15} className="text-[#757C91] " />
              Ratings
            </label>
            <input
              type="text"
              value={silverRated}
              onChange={(e) => setSilverRated(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>
        </form>
      </div>

      <div className="space-y-2 p-5 border border-[#D6DBE7] rounded-xl">
        <main className="py-2 font-semibold border-b border-[#F1F2F4] flex justify-between items-center">
          <div className="flex text-[20px] gap-2 items-center">
            <GoldIcon className="" />
            <p className="text-[#121921] tracking-wide">Gold rated</p>
          </div>
          <p className="text-[#757C91] text-sm">Experienced level</p>
        </main>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="py-2 text-[#757C91] uppercase font-semibold text-[14px]">Criteria</h2>

          <div className="flex gap-6">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <BriefcaseBusiness size={15} className="text-[#757C91] " />
              Jobs
            </label>
            <input
              type="text"
              value={goldJobs}
              onChange={(e) => setGoldJobs(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <StarIcon size={15} className="text-[#757C91] " />
              Ratings
            </label>
            <input
              type="text"
              value={goldRated}
              onChange={(e) => setGoldRated(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>
        </form>
      </div>

      <div className="space-y-2 p-5 border border-[#D6DBE7] rounded-xl">
        <main className="py-2 font-semibold border-b border-[#F1F2F4] flex justify-between items-center">
          <div className="flex text-[20px] gap-2 items-center">
            <PlatinumIcon className="" />
            <p className="text-[#121921] tracking-wide">Platinum rated</p>
          </div>
          <p className="text-[#757C91] text-sm">Elite level</p>
        </main>
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="py-2 text-[#757C91] uppercase font-semibold text-[14px]">Criteria</h2>

          <div className="flex gap-6">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <BriefcaseBusiness size={15} className="text-[#757C91] " />
              Jobs
            </label>
            <input
              type="text"
              value={platinumJobs}
              onChange={(e) => setPlatinumJobs(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor=""
              className="flex gap-3 justify-between items-center text-[14px] text-[#757C91]"
            >
              <StarIcon size={15} className="text-[#757C91] " />
              Ratings
            </label>
            <input
              type="text"
              value={platinumRated}
              onChange={(e) => setPlatinumRated(e.target.value)}
              placeholder=""
              className="w-full font-bold text-[#3B4152] p-[12px] bg-[#F9F9FB] text-sm rounded-xl focus:outline-none border border-transparent focus:border-[#D6DBE7]"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
});

export default RatingsBadges;
