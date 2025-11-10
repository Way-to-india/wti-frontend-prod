import { Tour } from '@/types/comman';
import TourCard from './TourCard';

interface ToursListProps {
  tours: Tour[];
}

export default function ToursList({ tours }: ToursListProps) {
  if (!tours || tours.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} />
      ))}
    </div>
  );
}