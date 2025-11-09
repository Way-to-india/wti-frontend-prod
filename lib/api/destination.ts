import { cacheLife, cacheTag } from 'next/cache';
import { endPoints } from '@/constants/endpoints';

export async function getDestinationHomePageData() {
  'use cache';
  cacheTag('destination');
  cacheLife('hours');
  try {
    const url = endPoints.destination.getHomePageData;
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

export async function getCityDestination(state : string,city : string) {
  'use cache';
  cacheTag('destination',`${state}-${city}`);
  cacheLife('hours');
  try {
    const url = endPoints.destination.getCityDestination(state,city);
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

export async function getMonumentDetail(monument : string) {
  'use cache';
  cacheTag('destination', `monument-${monument}`);
  cacheLife('hours');
  try {
    const url = endPoints.destination.getMonument(monument);
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