import { Monument } from '@/types/comman';
import { MapPin, Star, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ListCityMonument = ({ monuments }: { monuments: Monument[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {monuments.map((monument) => (
        <div
          key={monument.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
        >
          {/* Header */}
          <div className="bg-linear-to-br from-orange-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                  {monument.typeofPlace}
                </span>

                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="text-white font-semibold text-sm">{monument.rating}</span>
                  <span className="text-white/80 text-xs">({monument.totalRatings})</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                {monument.monumentName}
              </h3>

              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{monument.city}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed">
              {monument.description}
            </p>

            {/* Best Time Section */}
            <div className="flex items-center gap-2 text-sm bg-orange-50 p-3 rounded-lg">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span className="text-gray-700">
                <span className="font-semibold text-orange-600">Best time:</span> {monument.besttime}
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/destinations/${monument.stateSlug}/${monument.citySlug}/${monument.slug}`}
              className="flex items-center justify-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 group-hover:shadow-lg"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCityMonument;
