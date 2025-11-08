'use client';

import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import type { ProviderOverview, ProviderProfile } from '@/types/types';
import type { PaginationMeta } from '@/features/users/types';
import BadgeCard from './BadgeOverview';
import Button from '@/components/ui/Button';

export interface ProviderReviewItem {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
}

export interface ProvidersOverviewProps {
  overview?: ProviderOverview | null;
  usersData: ProviderProfile;
  reviews: ProviderReviewItem[];
  pagination?: PaginationMeta;
  isLoadingReviews?: boolean;
  onPageChange: (page: number) => void;
}

function renderReviews(
  reviews: ProviderReviewItem[],
  pagination: PaginationMeta | undefined,
  onPageChange: (page: number) => void,
  ratings?: ProviderOverview['ratings'],
) {
  const totalReviews = pagination?.total ?? reviews.length;
  const currentPage = pagination?.page ?? 1;
  const totalPages = pagination?.pages ?? 1;
  const perPage = pagination?.limit ?? reviews.length;
  const reviewStartIndex = totalReviews === 0 ? 0 : (currentPage - 1) * perPage;
  const reviewEndIndex =
    totalReviews === 0 ? 0 : Math.min(reviewStartIndex + reviews.length, totalReviews);
  const averageRating = ratings?.average ?? 0;
  const totalRecordedReviews = ratings?.totalReviews ?? totalReviews;

  const paginationItems = (() => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, idx) => idx + 1);
    }

    const items: (number | 'ellipsis')[] = [1];

    if (currentPage > 2) {
      items.push('ellipsis');
    }

    if (currentPage > 1 && currentPage < totalPages) {
      items.push(currentPage);
    }

    if (currentPage < totalPages - 1) {
      items.push('ellipsis');
    }

    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  })();

  return (
    <div className="space-y-6 bg-[#F9F9FB] p-4 border-l border-[#F1F2F4]">
      <div className="border-b border-[#D6DBE7] pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold">
            Reviews & <br /> Ratings
          </h3>
          <div className="text-right">
            <p className="text-4xl font-black">{averageRating.toFixed(1)}</p>
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill={index < Math.round(averageRating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {totalRecordedReviews.toLocaleString()} reviews
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-sm">
        {reviews.length === 0 ? (
          <p className="text-center text-[#757C91]">No reviews available for this provider.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex justify-between border-b border-dotted border-[#D6DBE7] pb-2"
            >
              <div>
                <p className="font-medium text-[#121921]">{review.name}</p>
                <p className="text-xs text-[#757C91]">{review.date}</p>
                <p className="text-[#3B4152]">{review.text}</p>
              </div>

              <div className="mt-1 flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={14} fill={idx < review.rating ? 'currentColor' : 'none'} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {totalReviews > 0 && totalPages > 1 ? (
        <div className="mt-2 flex items-center justify-between border-t border-[#D6DBE7] pt-4 text-xs text-[#757C91]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6DBE7] disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            {paginationItems.map((item, idx) =>
              item === 'ellipsis' ? (
                <span key={`ellipsis-${idx}`} className="px-1 text-[#757C91]">
                  …
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => onPageChange(item)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                    item === currentPage
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
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6DBE7] disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>

          <p>
            Showing results {reviewStartIndex + 1}-{reviewEndIndex} of {totalReviews}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function Overview({
  overview,
  usersData,
  reviews,
  pagination,
  isLoadingReviews = false,
  onPageChange,
}: ProvidersOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-[#F1F2F4] lg:grid-cols-3">
      <div className="col-span-2 space-y-6 p-4 lg:p-6">
        {overview ? (
          <>
            <BadgeCard badges={overview} usersData={usersData} />

            <div>
              <h3 className="mb-2 font-semibold text-[#757C91]">ABOUT</h3>
              <p className="text-lg leading-relaxed text-[#3B4152]">
                {overview.about || 'The provider has not added an about section yet.'}
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-[#757C91]">PRICES</h3>
              <div className="grid grid-cols-2 gap-y-4">
                <p className="text-[#757C91]">Starting fee</p>
                <p className="text-right font-bold text-[#3B4152]">
                  ₦{overview.prices?.startingFee ?? 0}
                </p>
                <p className="text-[#757C91]">Minimum acceptable offer</p>
                <p className="text-right font-bold text-[#3B4152]">
                  ₦{overview.prices?.minimumOffer ?? 0}
                </p>
              </div>
            </div>

            {overview.gallery && overview.gallery.length > 0 ? (
              <div>
                <h3 className="mb-2 font-semibold text-[#757C91]">GALLERY</h3>
                <div className="flex flex-wrap gap-2">
                  {overview.gallery.map((src, idx) => (
                    <div key={src ?? idx} className="relative h-24 w-24 overflow-hidden rounded-lg">
                      <Image src={src} alt={`gallery-${idx}`} fill className="object-cover" />
                      <Button
                        variant="icon"
                        className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F0443A] text-white"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#EAECF5] bg-[#F9F9FB] px-6 py-10 text-center text-sm text-[#757C91]">
            This provider has not completed their overview details yet.
          </div>
        )}
      </div>

      <div className="border-l border-[#F1F2F4]">
        {isLoadingReviews ? (
          <div className="flex h-full items-center justify-center text-sm text-[#757C91]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading reviews…
          </div>
        ) : (
          renderReviews(reviews, pagination, onPageChange, overview?.ratings)
        )}
      </div>
    </div>
  );
}
