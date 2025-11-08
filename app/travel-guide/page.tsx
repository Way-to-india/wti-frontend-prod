import { Overview } from '@/components/travel-guide/Overview';
import TravelGuideData from '@/components/travel-guide/TravelGuideData';
import { getTravelGuide } from '@/lib/api/travel-guide';

const TravelGuide = async () => {
  const travelGuideData = await getTravelGuide();
  const parsedData = travelGuideData?.payload;
  console.log(JSON.stringify(parsedData));
  return (
    <div className='max-w-7xl mx-auto'>
      <div className="text-sm text-gray-600 lg:mb-8 mb-4 md:mt-6 mt-3">
        <span className="hover:text-orange-500 transition-colors cursor-pointer">Home</span>
        <span className="mx-2">→</span>
        <span className="text-orange-500 font-semibold">Travel Guide</span>
      </div>
      <Overview />
      <TravelGuideData overview={parsedData}/>
    </div>
  )
}

export default TravelGuide;