'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import StarIcon from '@/assets/star-icon.svg';
import JobIcon from '@/assets/role-icon.svg';
import RatingIcon from '@/assets/pending-gray-icon.svg';
import BadgeCard from './BadgeOverview';
import type { ProviderOverview, ProviderProfile } from '@/types/types';
import Button from '@/components/ui/Button';

export default function Overview({
  provider,
  usersData,
}: {
  provider: ProviderOverview;
  usersData: ProviderProfile;
}) {
  const REVIEWS_PER_PAGE = 5;
  const [reviewsPage, setReviewsPage] = useState(1);
  const totalReviews = provider.reviews?.length ?? 0;
  const totalReviewPages = Math.max(1, Math.ceil(totalReviews / REVIEWS_PER_PAGE));

  useEffect(() => {
    setReviewsPage(1);
  }, [provider.reviews?.length]);

  useEffect(() => {
    if (reviewsPage > totalReviewPages) {
      setReviewsPage(totalReviewPages);
    }
  }, [reviewsPage, totalReviewPages]);

  const paginatedReviews = useMemo(() => {
    const reviews = provider.reviews ?? [];
    const start = (reviewsPage - 1) * REVIEWS_PER_PAGE;
    return reviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [provider.reviews, reviewsPage]);

  const reviewStartIndex = totalReviews === 0 ? 0 : (reviewsPage - 1) * REVIEWS_PER_PAGE;
  const reviewEndIndex = totalReviews === 0 ? 0 : Math.min(reviewStartIndex + REVIEWS_PER_PAGE, totalReviews);

  const paginationItems = useMemo<(number | 'ellipsis')[]>(() => {
    if (totalReviewPages <= 3) {
      return Array.from({ length: totalReviewPages }, (_, idx) => idx + 1);
    }

    const items: (number | 'ellipsis')[] = [1];

    if (reviewsPage > 2) {
      items.push('ellipsis');
    }

    if (reviewsPage > 1 && reviewsPage < totalReviewPages) {
      items.push(reviewsPage);
    }

    if (reviewsPage < totalReviewPages - 1) {
      items.push('ellipsis');
    }

    if (totalReviewPages > 1) {
      items.push(totalReviewPages);
    }

    return items;
  }, [reviewsPage, totalReviewPages]);

  const handleReviewPageChange = (page: number) => {
    if (page < 1 || page > totalReviewPages) return;
    setReviewsPage(page);
  };

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
                <Button
                  variant="icon"
                  className="absolute top-[-8px] right-[-8px] !p-0 w-5 h-5 !rounded-full !bg-red-500 text-white text-2xl flex items-center justify-center"
                >
                  ×
                </Button>
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
              <p className="text-xs text-gray-500">
                {provider.ratings.totalReviews.toLocaleString()} reviews
              </p>
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
          {paginatedReviews.map((review) => (
            <div
              key={review.id}
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

        {totalReviews > 0 && totalReviewPages > 1 && (
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#D6DBE7] text-xs text-[#757C91]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleReviewPageChange(reviewsPage - 1)}
                disabled={reviewsPage === 1}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6DBE7] disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {paginationItems.map((item, idx) =>
                item === 'ellipsis' ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-[#757C91]">
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleReviewPageChange(item)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                      item === reviewsPage
                        ? 'border-[#017441] bg-[#F3FCF4] text-[#017441]'
                        : 'border-[#D6DBE7] text-[#757C91] hover:border-[#9AA0B4] hover:text-[#3B4152]'
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => handleReviewPageChange(reviewsPage + 1)}
                disabled={reviewsPage === totalReviewPages}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6DBE7] disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <p>
              Showing results {reviewStartIndex + 1}-{reviewEndIndex} of {totalReviews}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
