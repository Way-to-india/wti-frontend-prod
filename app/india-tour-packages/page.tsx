import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import TourSearch from '@/components/tours/TourSearch';
import ToursFilters from '@/components/tours/TourFilters';
import ToursContent from '@/components/tours/TourContent';
import { getTourCities, getTourThemes } from '@/lib/api/tours';
import { TourSkeleton } from '@/components/skeleton';


interface PageProps {
  searchParams: Promise<{
    city?: string;
    theme?: string;
    page?: string;
  }>;
}

async function FiltersWrapper({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const params = await searchParams;
  const [cities, themes] = await Promise.all([
    getTourCities(),
    getTourThemes(),
  ]);

  return <ToursFilters cities={cities} themes={themes} currentCity={params.city} currentTheme={params.theme} />;
}

async function SearchWrapper({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const [cities, themes] = await Promise.all([
    getTourCities(),
    getTourThemes(),
  ]);

  return <TourSearch cities={cities} themes={themes} />;
}

async function ContentWrapper({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const cities = await getTourCities();
  return <ToursContent searchParams={searchParams} cities={cities} />;
}

export default async function ToursPage({ searchParams }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50">

      <Suspense fallback={<div className="h-64 bg-linear-to-r from-orange-500 to-orange-600 animate-pulse" />}>
        <SearchWrapper searchParams={searchParams} />
      </Suspense>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-orange-600 font-medium">Tours</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Suspense fallback={<div className="h-64 bg-white rounded-lg animate-pulse" />}>
              <FiltersWrapper searchParams={searchParams} />
            </Suspense>
          </div>

          <div className="lg:col-span-3">
            <Suspense fallback={<TourSkeleton />}>
              <ContentWrapper searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}