import { FiClock, FiMapPin, FiUsers, FiHome } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { CityItem, ThemeItem, Tour } from '@/types/comman';
import TourDescription from './TourDescription';
import TourQuery from './TourQuery/TourQuery';
import ShareTour from './ShareTour';

type TourContentProps = {
  title: string;
  duration: Tour["duration"];
  startCity: Tour["startCity"];
  best_time: Tour["best_time"];
  ideal_for: Tour["ideal_for"];
  cities: CityItem[];
  themes: ThemeItem[];
  description: string;
  highlights: string[];
};

const TourContent = (tour: TourContentProps) => {

  const durationText = `${tour.duration.nights} Nights / ${tour.duration.days} Days`;
  const startingPoint = tour.startCity?.name || "N/A";
  const bestTime = tour.best_time;
  const idealFor = tour.ideal_for;
  const destinations = tour.cities?.map(c => c.name);
  const theme = tour.themes?.[0]?.name;

  return (
    <div className="mt-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {tour.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500" role="img" aria-label="4 out of 5 stars">
              {[1, 2, 3, 4].map((star) => (
                <FaStar key={star} className="w-4 h-4" aria-hidden="true" />
              ))}
              <FaStar className="w-4 h-4 text-gray-300" aria-hidden="true" />
            </div>
            <span className="text-sm text-gray-600">(4 Ratings)</span>
          </div>
        </div>
        <ShareTour tour={{title : tour.title,duration : tour.duration}} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">
        <InfoCard icon={<FiClock className="w-4 h-4" />} label="Duration" value={durationText} />
        <InfoCard icon={<FiMapPin className="w-4 h-4" />} label="Starting From" value={startingPoint} />
        <InfoCard icon={<FiClock className="w-4 h-4" />} label="Best Time" value={bestTime} />
        <InfoCard icon={<FiUsers className="w-4 h-4" />} label="Ideal For" value={idealFor} />

        {/* Destination Covered Card */}
        <div className="border border-gray-200 bg-white rounded-xl p-3 flex items-start gap-3">
          <div className="bg-orange-100 p-1.5 rounded-lg">
            <FiHome className="w-4 h-4 text-orange-600" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-600 mb-1 font-medium">Destination Covered</p>
            <div className="flex flex-wrap gap-1.5" role="list" aria-label="Destinations covered">
              {destinations?.slice(0, 4).map((name, idx) => (
                <span
                  key={idx}
                  className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium"
                  role="listitem"
                >
                  {name}
                </span>
              ))}
              {destinations && destinations.length > 4 && (
                <span
                  className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  role="listitem"
                  aria-label={`${destinations.length - 4} more destinations`}
                >
                  +{destinations.length - 4} More
                </span>
              )}
            </div>
          </div>
        </div>

        <InfoCard icon={<FiHome className="w-4 h-4" />} label="Themes" value={theme} />
      </div>

      <section aria-labelledby="tour-highlights">
        <h2 id="tour-highlights" className="text-lg font-semibold text-orange-700 mb-2">
          Highlights Of {tour.title}:
        </h2>

        <ul className="space-y-1">
          {tour.highlights?.map((hl, idx) => (
            <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-orange-600 mt-0.5" aria-hidden="true">•</span>
              {hl}
            </li>
          ))}
        </ul>

        <TourQuery />

        <div className='mt-5'>
          <h3 className='font-medium mb-3 text-gray-900'>Description</h3>
          <TourDescription description={tour.description} />
        </div>
      </section>
    </div>
  )
}

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) => (
  <div className="border border-gray-200 bg-white rounded-xl p-3 flex items-start gap-3">
    <div className="bg-orange-100 p-1.5 rounded-lg" aria-hidden="true">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-600 mb-0.5 font-medium">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || 'N/A'}</p>
    </div>
  </div>
)

export default TourContent;