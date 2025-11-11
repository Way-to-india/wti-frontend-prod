import { searchTours } from '@/lib/api/tours';
import ToursList from './TourList';
import Pagination from './Pagination';
import type { CityItem } from '@/types/comman';

interface ToursContentProps {
    searchParams: Promise<{
        cityId?: string;
        themeId?: string;
        page?: string;
    }>;
    cities: CityItem[];
}

export default async function ToursContent({ searchParams, cities }: ToursContentProps) {
    const params = await searchParams;

    const currentPage = params.page ? parseInt(params.page, 10) : 1;
    const validPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

    try {
        const res = await searchTours({
            cityId: params.cityId || undefined,
            themeId: params.themeId || undefined,
            page: validPage,
            limit: 9,
        });

        // Extract data with fallbacks
        const tours = res?.payload?.tours || res?.tours || [];
        const pagination = res?.payload?.pagination || res?.pagination || null;

        // Create pagination object with safe defaults
        const paginationData = {
            page: pagination?.page || pagination?.currentPage || validPage,
            totalPages: pagination?.totalPages || pagination?.total_pages || 1,
            total: pagination?.total || pagination?.totalCount || tours.length,
        };

        // Ensure we have valid numbers
        const safePage = isNaN(paginationData.page) ? 1 : Math.max(1, paginationData.page);
        const safeTotalPages = isNaN(paginationData.totalPages) ? 1 : Math.max(1, paginationData.totalPages);
        const safeTotal = isNaN(paginationData.total) ? 0 : Math.max(0, paginationData.total);

        return (
            <>
                {/* Results Count */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {safeTotal > 0
                            ? `Found ${safeTotal} tour${safeTotal !== 1 ? 's' : ''}`
                            : 'No tours found'
                        }
                    </h1>
                    {params.cityId && Array.isArray(cities) && cities.length > 0 && (
                        <p className="text-gray-600 mt-1">
                            in {cities.find(c => c.id === params.cityId)?.name || params.cityId}
                        </p>
                    )}
                    {params.themeId && (
                        <p className="text-gray-600 mt-1">
                            Theme: {params.themeId}
                        </p>
                    )}
                </div>

                {/* Tours List */}
                {tours.length > 0 ? (
                    <ToursList tours={tours} />
                ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No tours match your search criteria. Try adjusting your filters.
                        </p>
                    </div>
                )}

                {safeTotalPages > 1 && (
                    <Pagination
                        currentPage={safePage}
                        totalPages={safeTotalPages}
                    />
                )}
            </>
        );
    } catch (error) {
        console.error('Error loading tours:', error);
        return (
            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                <h2 className="text-red-800 font-semibold mb-2">Error loading tours</h2>
                <p className="text-red-600">
                    There was a problem loading the tours. Please try again later.
                </p>
            </div>
        );
    }
}