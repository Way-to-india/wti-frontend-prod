import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  url: string;
  overview: string;
  description: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  rating: number;
  imageUrls: string[];
  themes: Array<{ id: string; name: string; label: string; slug: string }>;
  cities: Array<{ id: string; name: string; label: string; slug: string }>;
}

interface SimilarTourCardProps {
  tour: Tour;
}

export default function SimilarTourCard({ tour }: SimilarTourCardProps) {
  const imageUrl = tour.imageUrls?.[0] || '/placeholder-tour.jpg';
  const primaryCity = tour.cities?.[0]?.name || 'Various Locations';
  return (
    <Link href={`/${tour.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        
        <div className="relative h-64 overflow-hidden">
          <Image
            src={imageUrl}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          
          {tour.rating > 0 && (
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm text-gray-900">{tour.rating.toFixed(1)}</span>
            </div>
          )}

          
          {tour.themes?.[0] && (
            <div className="absolute top-4 left-4 bg-linear-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
              {tour.themes[0].label}
            </div>
          )}
        </div>

        
        <div className="p-6 flex flex-col grow">
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {tour.title}
          </h3>

          
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>
                {tour.duration.days}D / {tour.duration.nights}N
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="line-clamp-1">{primaryCity}</span>
            </div>
          </div>

          
          <p className="text-gray-600 text-sm line-clamp-3 mb-6 grow">
            {tour.overview || tour.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group-hover:gap-3">
              View Details
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}