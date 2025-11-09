import DestinationBreadcrumb from '@/components/destinations/HomePage/DestinationBreadcrumb';
import { getDestinationHomePageData } from '@/lib/api/destination'
import { PlacesHero } from '@/components/destinations/HomePage/PlacesHero';
import { StatsOverview } from '@/components/destinations/HomePage/StatsOverview';
import { Suspense } from 'react';
import Loader from '@/components/skeleton/Loader';
import { HomepageData } from '@/types/comman';
import { CategoryGrid } from '@/components/destinations/HomePage/CategoryGrid';
import StatesCityAccordian from '@/components/destinations/HomePage/StatesCityAccordian';

const Destinations = async () => {
  const destination = await getDestinationHomePageData();
  const parsedData = destination?.payload as HomepageData;
  return (
    <Suspense fallback={<Loader className='mt-30' />}>
      <div className='max-w-7xl mt-10 mx-auto'>
        <DestinationBreadcrumb />
        <PlacesHero />
        <StatsOverview statistics={parsedData.statistics} />
        <CategoryGrid categories={parsedData.categories} />
        <StatesCityAccordian states={parsedData.states} />
      </div>
    </Suspense>
  )
}

export default Destinations;