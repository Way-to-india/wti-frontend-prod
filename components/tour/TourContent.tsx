import { FiClock, FiMapPin, FiUsers, FiHome, FiShare2 } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { CityItem, ThemeItem, Tour } from '@/types/comman';
import TourDescription from './TourDescription';

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
            <div className="flex items-center text-yellow-500">
              {[1, 2, 3, 4].map((star) => (
                <FaStar key={star} className="w-4 h-4" />
              ))}
              <FaStar className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-sm text-gray-600">4 Ratings</span>
          </div>
        </div>

        <button className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition">
          <FiShare2 className="w-4 h-4" />
        </button>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6">

        <InfoCard icon={<FiClock className="w-4 h-4" />} label="Duration" value={durationText} />
        <InfoCard icon={<FiMapPin className="w-4 h-4" />} label="Starting From" value={startingPoint} />
        <InfoCard icon={<FiClock className="w-4 h-4" />} label="Best Time" value={bestTime} />
        <InfoCard icon={<FiUsers className="w-4 h-4" />} label="Ideal For" value={idealFor} />


        <div className="border border-gray-200 bg-white rounded-xl p-3 flex items-start gap-3">
          <div className="bg-orange-100 p-1.5 rounded-lg">
            <FiHome className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">Destination Covered</p>
            <div className="flex flex-wrap gap-1.5">
              {destinations?.slice(0, 4).map((name, idx) => (
                <span key={idx} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                  {name}
                </span>
              ))}
              {destinations && destinations.length > 4 && (
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs">
                  +{destinations.length - 4} More
                </span>
              )}
            </div>
          </div>
        </div>

        <InfoCard icon={<FiHome className="w-4 h-4" />} label="Themes" value={theme} />
      </div>


      <div>
        <h2 className="text-lg font-semibold text-orange-500 mb-2">
          Highlights Of {tour.title}:
        </h2>

        <ul className="space-y-1">
          {tour.highlights?.map((hl, idx) => (
            <li key={idx} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-orange-500 mt-0.5">•</span>{hl}
            </li>
          ))}
        </ul>

        <div className='mt-5'>
          <h3 className='font-medium mb-3'>Description</h3>
          <TourDescription description={tour.description} />
        </div>
      </div>
    </div>
  )
}

const InfoCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | null }) => (
  <div className="border border-gray-200 bg-white rounded-xl p-3 flex items-start gap-3">
    <div className="bg-orange-100 p-1.5 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
)

export default TourContent;
