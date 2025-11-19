import CreateTourReview from '@/app/tour-reviews/CreateReview';
import ShowTourReviews from '@/app/tour-reviews/ShowReviews';

export default async function TourReviews({ tourId }: { tourId: string }) {

  return (
    <div>
      <CreateTourReview tourId={tourId}/>
      <ShowTourReviews tourId={tourId} />
    </div>
  );
}