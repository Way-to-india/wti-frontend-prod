import ListCityMonument from '@/components/destinations/City/ListMonument';
import Loader from '@/components/skeleton/Loader';
import { getCityDestination } from '@/lib/api/destination';
import { CityMonumentsType } from '@/types/comman';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export type Props = {
    params: Promise<{ state: string, city: string }>
}


const CityDestinationInfo = async ({ params }: Props) => {
    const { state, city } = await params;
    const destinationInfo = await getCityDestination(state,city);
    const parsedData = destinationInfo?.payload as CityMonumentsType;
    if(!parsedData) return <Loader className='mt-30'/>
    return (
      <div className="lg:mx-[7%] mx-[4%] font-sans space-y-8 pb-12">
        <Link
          href={"/destinations"}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </Link>

        <div className="bg-linear-to-br from-orange-500 via-orange-600 to-red-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8" />
              <h1 className="text-4xl lg:text-5xl font-bold">{parsedData.cityName}</h1>
            </div>
            <p className="text-orange-100 text-lg mb-6">
              {parsedData.stateName} • {parsedData.count} attractions to explore
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-medium">🏛️ Historical Sites</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-medium">📸 Photo Spots</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white font-medium">🎫 Tourist Attractions</span>
              </div>
            </div>
          </div>
        </div>
        <ListCityMonument monuments={parsedData.monuments}/>
        </div>
    )
}

export default function CityDestination({ params }: Props) {
    return (
        <Suspense fallback={<Loader className='mt-30' />}>
            <CityDestinationInfo params={params} />
        </Suspense>
    );
}