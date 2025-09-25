'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';
import StarIcon from '@/assets/star-icon.svg';
import JobIcon from '@/assets/role-icon.svg';
import RatingIcon from '@/assets/pending-gray-icon.svg';
import BadgeCard from './BadgeOverview';
export default function Overview({ provider, usersData }) {
  return (
    <div className="grid grid-cols-3 gap-1  border-t-[1px]  border-[#F1F2F4]">
      {/* LEFT COLUMN */}
      <div className="col-span-2 space-y-6 m-4">
        {/* Bronze Rated */}
        <BadgeCard badges={provider} usersData={usersData} />
        {/* About */}
        <div className="">
          <h3 className="font-semibold mb-2 text-[#757C91]">ABOUT</h3>
          <p className="text-lg text-[#3B4152] leading-relaxed">{provider.about}</p>
        </div>

        {/* Prices */}
        <div>
          <h3 className="font-semibold mb-3 text-[#757C91]">PRICES</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <p className="text-[#757C91]">Starting fee</p>
            <p className="text-right font-bold text-[#3B4152]">₦{provider.prices.startingFee}</p>
            <p className="text-[#757C91]">Minimum acceptable offer</p>
            <p className="text-right font-bold text-[#3B4152]">₦{provider.prices.minimumOffer}</p>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="font-semibold mb-2 text-[#757C91]">GALLERY</h3>
          <div className="flex gap-2">
            {/* Add new image placeholder */}
            <div className="w-24 h-24 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-gray-400 cursor-pointer">
              <Image src="/icons/image-placeholder.svg" alt="" width={24} height={24} />
            </div>
            {provider.gallery?.map((src, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-lg  ">
                <Image src={src} alt={`gallery-${idx}`} fill className="object-cover" />
                <button className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5  text-2xl flex items-center justify-center ">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Reviews */}
      <div className="space-y-6 bg-[#F9F9FB] p-4 border-l   border-[#F1F2F4]">
        {/* Ratings Summary */}
        <div className=" border-b border-[#D6DBE7] pb-3">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl">
              Reviews & <br /> Ratings
            </h3>
            <div className="text-right">
              <p className="text-4xl font-black">{provider.ratings.average}</p>
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < provider.ratings.average ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">2,000 reviews</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#121921]">
            <div className="flex items-center gap-1 border-r border-[#D6DBE7] pr-4">
              <Image src="/laugh-icon.png" alt="" width={12} height={12} />
              <p> {provider.ratings.breakdown[5]}</p>
            </div>

            <div className="flex items-center gap-1 border-r border-[#D6DBE7]  pr-4">
              <Image src="/happy-icon.png" alt="" width={12} height={12} />
              <p> {provider.ratings.breakdown[4]}</p>
            </div>

            <div className="flex items-center gap-1 border-r border-[#D6DBE7] pr-4">
              <Image src="/smile-icon.png" alt="" width={12} height={12} />
              <p> {provider.ratings.breakdown[3]}</p>
            </div>

            <div className="flex items-center gap-1 border-r border-[#D6DBE7] pr-4">
              <Image src="/annoyed-icon.png" alt="" width={12} height={12} />
              <p> {provider.ratings.breakdown[2]}</p>
            </div>

            <div className="flex items-center gap-1">
              <Image src="/angry-icon.png" alt="" width={12} height={12} />
              <p> {provider.ratings.breakdown[1]}</p>
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4 text-sm">
          {provider.reviews?.map((review, idx) => (
            <div
              key={idx}
              className="border-dotted border-b border-[#D6DBE7] pb-2 flex justify-between"
            >
              <div className="">
                <p className="font-medium text-[#121921]">{review.name}</p>
                <p className="text-xs text-[#757C91]">{review.date}</p>
                <p className="text-[#3B4152]">{review.text}</p>
              </div>

              <div className="flex gap-1 text-yellow-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
