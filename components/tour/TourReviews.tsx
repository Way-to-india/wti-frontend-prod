import Image from "next/image";
import { getTourReview } from "@/lib/api/tourReview";
import { Star } from "lucide-react";
import { TourReview, TourReviewImage } from "@/types/comman"

export default async function TourReviews({ tourId }: { tourId: string }) {
  const data = await getTourReview(tourId);
  const reviews = data?.payload ?? [];
  console.log(reviews);
  if (reviews.length === 0) {
    return <p className="text-gray-500 text-center py-6">No reviews available yet.</p>;
  }

  return (
    <div className="space-y-6 mt-6">
      {reviews.map((r : TourReview, idx: number) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 transition hover:shadow-md"
        >

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                {r.userName?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{r.userName}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < r.rating ? "fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
            </div>

            {r.date && (
              <p className="text-sm text-gray-400">{r.date}</p>
            )}
          </div>


          <div className="mt-3">
            <h4 className="font-semibold text-gray-800">{r.title}</h4>
            <p className="text-gray-700 mt-1">{r.comment}</p>
          </div>


          {r.images?.length > 0 && (
            <div className="flex gap-3 mt-3 flex-wrap">
              {r.images.map((img: TourReviewImage, i: number) => (
                <div
                  key={i}
                  className="relative w-28 h-28 rounded-xl overflow-hidden border border-gray-100"
                >
                  <Image
                    src={img.url}
                    alt={`Review image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              ))}
            </div>
          )}


          <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
            <span className="flex items-center gap-1 hover:text-orange-500 cursor-pointer transition">
              👍 Helpful ({r.helpful ?? 0})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
