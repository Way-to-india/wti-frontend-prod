import { cacheLife, cacheTag } from 'next/cache';
import { endPoints } from '@/constants/endpoints';

export async function getTourReview(tourId: string) {
  'use cache';
  cacheTag('tour-review', `tour-${tourId}-reviews`);
  cacheLife('hours');
  try {
    const url = endPoints.tour.reviews.getReview.replace(':tourId', tourId);
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch reviews: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tour reviews:', error);
    throw error;
  }
}
