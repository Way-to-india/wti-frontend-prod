import { TravelGuideOverview } from '@/types/comman';
import Link from 'next/link';


const TravelGuideData = ({ overview }: { overview: TravelGuideOverview[] }) => {
  return (
    <div className="space-y-12 py-8 mt-5">
      {overview.map((state) => (
        <div key={state.id} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Top Destinations in {state.name}
          </h2>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {state.cities.map((city) => (
                <Link href={`/travel-guide/${state.name}/${city.citySlug}`} key={city.id} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{city.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelGuideData;
