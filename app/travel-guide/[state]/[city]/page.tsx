import Loader from '@/components/skeleton/Loader';
import TravelGuideCityDataClient from '@/components/travel-guide/TravelGuideCityDataClient';
import { getTravelGuideData } from '@/lib/api/travel-guide';
import { Suspense } from 'react';

export type Props = {
    params: Promise<{ state: string, city: string }>
}


const TravelGuideCityData = async ({ params }: Props) => {
    const { state, city } = await params;
    const cityData = await getTravelGuideData(state, city);
    const parsedData = cityData?.payload;
    return <TravelGuideCityDataClient cityData={parsedData} />;
}

function TravelGuideLoading() {
    return <Loader className='mt-5'/>; 
}

export default function Page({ params }: Props) {
    return (
        <Suspense fallback={<TravelGuideLoading />}>
            <TravelGuideCityData params={params} />
        </Suspense>
    );
}