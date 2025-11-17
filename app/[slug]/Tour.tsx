import TourContent from '@/components/tour/TourContent'
import TourImages from '@/components/tour/TourImages'
import TourTabs from '@/components/tour/TourTabs'
import TourReviews from '@/components/tour/TourReviews'
import { BookingPolicy } from '@/components/comman'
import ContactSupport from '@/components/comman/ContactSupport'
import SimilarTours from '@/components/tour/SimilarTours'
import { getTourBySlug, getTourFAQSchema } from '@/lib/api/tours'
import { Tour } from '@/types/comman'
import { notFound } from 'next/navigation'
import { getMetaData } from '@/constants/MetaData'

export type Props = {
  params: Promise<{ slug: string }>
}


async function SingleTour({ params }: Props) {
  const { slug } = await params

  const [tour, faqData] = await Promise.all([
    getTourBySlug(slug),
    getTourFAQSchema(slug)
  ])

  if (!tour) notFound()

  const tourDetails = tour.payload as Tour
  const metaData = getMetaData(slug)
  const baseUrl = 'https://www.waytoindia.com'

  const touristTripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: metaData.title,
    description: metaData.description,
    url: `${baseUrl}${metaData.canonicalPath}`,
    image: tourDetails.imageUrls?.[0] || `${baseUrl}/og-image.jpg`,
    touristType: tourDetails.ideal_for || 'Tourists',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tourDetails.cities?.map((city, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: city,
        },
      })) || [],
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'waytoindia.com',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      telephone: '+91-8527255995',
      email: 'info@waytoindia.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      },
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      category: tourDetails.themes?.join(', ') || 'Tour Package',
    },
    duration: tourDetails.duration || 'Varies',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tours',
        item: `${baseUrl}/tours`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tourDetails.title,
        item: `${baseUrl}${metaData.canonicalPath}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {faqData?.payload?.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData.payload.faqSchema)
          }}
        />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section aria-label="Tour information">
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
        </section>

        <TourTabs
          {...tourDetails}
          tourId={slug}
          reviewsComponent={<TourReviews tourId={slug} />}
        />

        <BookingPolicy
          title={tour.title}
          cancellationPolicies={[]}
          termsAndConditions={[]}
        />

        <ContactSupport title={tourDetails.title} />

        <SimilarTours tourId={slug} />
      </main>
    </>
  )
}

export default SingleTour