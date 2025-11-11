import React, { Suspense } from 'react'
import { TourSkeleton } from '@/components/skeleton'
import TourContent, { Props } from './Tour'

export default async function Tour({ params }: Props) {
  return (
    <Suspense fallback={<TourSkeleton/>}>
      <TourContent params={params} />
    </Suspense>
  )
}

// // Generate static params for popular tours (optional but recommended)
// export async function generateStaticParams() {
//   'use cache'
//   cacheLife('days')
  
//   try {
//     const response = await fetch(`${endPoints.tour.id}`)
//     const tours = await response.json()
    
//     return tours.map((tour: { slug: string }) => ({
//       slug: tour.slug,
//     }))
//   } catch (error) {
//     console.error('Error generating static params:', error)
//     return []
//   }
// }