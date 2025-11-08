import { cacheLife, cacheTag } from 'next/cache';
import { endPoints } from '@/constants/endpoints';

export async function getTravelGuide() {
  'use cache';
  cacheTag('travel-guide',);
  cacheLife('hours');

  try {
    const url = endPoints.travelGuide.getAll;
    console.log(url);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to Travel Guide: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar tours:', error);
    throw error;
  }
}

export async function getTravelGuideData(state:string,city:string) {
  'use cache';
  cacheTag('travel-guide',`${state}-${city}`);
  cacheLife('hours');

  try {
    const url = endPoints.travelGuide.getData.replace(':city',city);
    console.log("url",url);
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to Travel Guide: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar tours:', error);
    throw error;
  }
}