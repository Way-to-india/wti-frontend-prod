import { TravelGuideCityDetails } from "@/types/comman";
import { Calendar, Info, MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  cityData: TravelGuideCityDetails;
}

const TravelGuideCityDataClient = ({ cityData }: Props) => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 lg:mb-6 mb-4 md:mt-6 mt-3 lg:mx-[7%] mx-[4%]">
        <Link href="/" className="hover:text-orange-500 transition-colors cursor-pointer">
          Home
        </Link>
        <span className="mx-2">→</span>
        <Link href="/travel-guide" className="hover:text-orange-500 transition-colors cursor-pointer">
          Travel Guide
        </Link>
        <span className="mx-2">→</span>
        <span className="text-orange-500 font-semibold">{cityData?.state}</span>
        <span className="mx-2">→</span>
        <span className="text-orange-500 font-semibold">{cityData?.city}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-12 mb-8 lg:mx-[7%] mx-[4%] font-sans">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-orange-600">
              <MapPin className="w-6 h-6" />
              <span className="text-lg font-medium">{cityData?.state}</span>
            </div>

            <h1 className="font-bold text-gray-900 lg:text-6xl md:text-5xl text-3xl tracking-tight">
              {cityData?.city} Travel Guide
            </h1>

            {cityData?.bestTimeToVisit && (
              <div className="inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Best time to visit: {cityData?.bestTimeToVisit}
                </span>
              </div>
            )}
          </div>

          {cityData?.introduction && (
            <p className="text-gray-700 text-md leading-relaxed max-w-4xl">
              {cityData?.introduction}
            </p>
          )}
        </div>
      </div>

      {/* Facts */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 lg:mx-[7%] mx-[4%] mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-5 h-5 bg-orange-500 rounded-xl flex items-center justify-center">
            <Info className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-bold text-gray-900 text-2xl">Facts</h2>
        </div>

        <p className="text-gray-700 leading-relaxed">{cityData?.facts}</p>
      </div>

      {/* Food & Shopping Sections */}
      <div className="grid md:grid-cols-2 gap-8 lg:mx-[7%] mx-[4%] mb-14">
        {cityData?.foodAndDining && (
          <div className="bg-linear-to-br from-orange-50 to-white rounded-3xl shadow-lg overflow-hidden border border-orange-100">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop"
                alt="Local cuisine"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-white font-bold text-2xl">What & Where to Eat</h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 leading-relaxed">{cityData?.foodAndDining}</p>
            </div>
          </div>
        )}

        {cityData?.shopping && (
          <div className="bg-linear-to-br from-purple-50 to-white rounded-3xl shadow-lg overflow-hidden border border-purple-100">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                alt="Shopping"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBag className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-white font-bold text-2xl">What & Where to Shop</h3>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-700 leading-relaxed">{cityData?.shopping}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelGuideCityDataClient;
