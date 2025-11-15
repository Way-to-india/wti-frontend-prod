import { Suspense } from 'react'
import { TourSkeleton } from '@/components/skeleton'
import TourContent, { Props } from './Tour'
import { Metadata } from 'next'
import { getMetaData } from '@/constants/MetaData'
import { getTourBySlug } from '@/lib/api/tours'
import type { Tour } from '@/types/comman'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const metaData = getMetaData(slug)
  const baseUrl = 'https://www.waytoindia.com'
  const canonicalUrl = `${baseUrl}${metaData.canonicalPath}`
  const tour = await getTourBySlug(slug)
  const tourDetails = tour?.payload as Tour | undefined
  const imageUrl = tourDetails?.imageUrls?.[0] || `${baseUrl}/og-image.jpg`

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.keywords,
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: canonicalUrl,
      siteName: 'waytoindia.com',
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: metaData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'revisit-after': '7 days',
    },
  }
}

export async function generateStaticParams() {
  const { getAllTourSlugs } = await import('@/constants/MetaData')
  const slugs = getAllTourSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function Tour({ params }: Props) {
  return (
    <Suspense fallback={<TourSkeleton />}>
      <TourContent params={params} />
    </Suspense>
  )
}