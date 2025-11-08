import { cacheLife, cacheTag } from 'next/cache';
import { endPoints } from '@/constants/endpoints';

export async function getTourBySlug(slug: string) {
  'use cache';
  cacheTag('tours', `tour-${slug}`);
  cacheLife('hours');
  try {
    const response = await fetch(`${endPoints.tour.id}/${slug}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch tour: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tour:', error);
    throw error;
  }
}

export async function getAllTours() {
  'use cache';
  cacheTag('tours');
  cacheLife('hours');

  const response = await fetch(`${endPoints.tour.id}`);
  return await response.json();
}

export async function getSimilarTours(slug: string) {
  'use cache';
  cacheTag('tours', `similar-${slug}`);
  cacheLife('hours');

  try {
    const url = endPoints.tour.similarTour.replace(':tourId', slug);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch similar tours: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar tours:', error);
    throw error;
  }
}
