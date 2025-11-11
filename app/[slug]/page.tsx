import React, { Suspense } from 'react'
import { TourSkeleton } from '@/components/skeleton'
import TourContent, { Props } from './Tour'
import { getMetaData } from '@/constants/MetaData'
import { Metadata } from 'next'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  
  const { slug } = await params
  const metaData = getMetaData(slug)

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.keywords,
    alternates: {
      canonical: `https://www.waytoindia.com${metaData.canonicalPath}`
    },
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: `https://www.waytoindia.com${metaData.canonicalPath}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.description,
    }
  }
}

export default async function Tour({ params }: Props) {
  return (
    <Suspense fallback={<TourSkeleton />}>
      <TourContent params={params} />
    </Suspense>
  )
}

// export async function generateStaticParams() {
//   const slugs = getAllTourSlugs()

//   return slugs.map((slug) => ({
//     slug: slug,
//   }))
// }