import React from 'react';
import Image from 'next/image';
import { Star, MapPin, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

interface Tour {
  id: string;
  title: string;
  description: string;
  duration: { nights: number; days: number };
  price: string;
  rating: number;
  best_time: string;
  ideal_for: string;
  imageUrls: string[];
  cities: { name: string; label: string }[];
  themes: { id: string; name: string }[];
}

interface LandingTourCardProps {
  tour: Tour;
}

const LandingTourCard: React.FC<LandingTourCardProps> = ({ tour }) => {
  return (
    <Link href={`/${tour.id}`}>
        <div className="bg-white-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full max-w-md cursor-pointer">
        <div className="relative h-56 sm:h-60 md:h-64 w-full overflow-hidden">
            <Image
            src={tour.imageUrls[0]}
            alt={tour.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover"
            priority={false}
            />
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-sm">{tour.rating}</span>
            </div>
        </div>

        <div className="flex-1 p-5 bg-[#1a1d29] flex flex-col space-y-4">
            <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-1 leading-tight">
            {tour.title}
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
            {tour.description}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-orange-600/20 text-orange-400 px-2.5 py-1 rounded-md text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{tour.duration.days}D / {tour.duration.nights}N</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-600/20 text-blue-400 px-2.5 py-1 rounded-md text-xs font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span className="truncate max-w-[180px]">{tour.best_time}</span>
            </div>
            </div>

            <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-orange-400">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Theme</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {tour.themes.slice(0, 2).map((theme) => (
                <span
                    key={theme.id}
                    className="bg-orange-900/40 text-orange-300 px-2.5 py-1 rounded-md text-xs font-medium border border-orange-700/50"
                >
                    {theme.name}
                </span>
                ))}
            </div>
            </div>

            <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-blue-400">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Destinations</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {tour.cities.slice(0, 3).map((city) => (
                <span
                    key={city.name}
                    className="bg-blue-900/40 text-blue-300 px-2.5 py-1 rounded-md text-xs font-medium border border-blue-700/50"
                >
                    {city.label}
                </span>
                ))}
                {tour.cities.length > 3 && (
                <span className="bg-gray-700/50 text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-600/40">
                    +{tour.cities.length - 3} more
                </span>
                )}
            </div>
            </div>
        </div>
        </div>
      </Link>
  );
};

export default LandingTourCard;