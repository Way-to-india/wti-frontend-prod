import TourContent from '@/components/tour/TourContent';
import TourImages from '@/components/tour/TourImages';
import TourTabs from '@/components/tour/TourTabs';
import TourReviews from '@/components/tour/TourReviews';
import { getTourBySlug } from '@/lib/api/tours';
import { Tour } from '@/types/comman';
import { notFound } from 'next/navigation';
import { BookingPolicy } from '@/components/comman';
import ContactSupport from '@/components/comman/ContactSupport';
import SimilarTours from '@/components/tour/SimilarTours';

export type Props = {
  params: Promise<{ slug: string }>
}

async function SingleTour({ params }: Props) {
  const { slug } = await params
  const tour = await getTourBySlug(slug);

  if (!tour) notFound();

  const tourDetails = tour.payload as Tour;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">

        <div className="w-full lg:w-1/2">
          <TourImages images={tourDetails.imageUrls} />
        </div>

        <div className="w-full lg:w-1/2">
          <TourContent {...{
            title: tourDetails.title,
            duration: tourDetails.duration,
            startCity: tourDetails.startCity,
            best_time: tourDetails.best_time,
            ideal_for: tourDetails.ideal_for,
            cities: tourDetails.cities,
            themes: tourDetails.themes,
            description: tourDetails.description,
            highlights: tourDetails.highlights
          }} />
        </div>
      </div>

      <TourTabs
        {...tourDetails}
        tourId={slug}
        reviewsComponent={<TourReviews tourId={slug} />}
      />

      <BookingPolicy title={tour.title}
        cancellationPolicies={[]}
        termsAndConditions={[]} />

      <ContactSupport title={tour.title} />

      <SimilarTours tourId={slug}/>

    </div>
  );
}

export default SingleTour;
