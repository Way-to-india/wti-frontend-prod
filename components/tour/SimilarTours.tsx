import { getSimilarTours } from '@/lib/api/tours';
import SimilarTourCard from './SimilarTourCard';
import Link from 'next/link';
import { Tour } from '@/types/comman';

const SimilarTours = async ({ tourId }: { tourId: string }) => {
    const response = await getSimilarTours(tourId);
    const tours = response?.payload || [];

    if (!tours || tours.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-linear-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Similar Tours You Might Like
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore more incredible destinations and experiences handpicked just for you
                    </p>
                </div>

                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tours.map((tour: Tour) => (
                        <SimilarTourCard key={tour.id} tour={tour} />
                    ))}
                </div>

                {tours.length >= 6 && (
                    <div className="text-center mt-12">
                        <Link
                            href="/india-tour-packages"
                            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-lg transition-colors"
                        >
                            View All Tours
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SimilarTours;