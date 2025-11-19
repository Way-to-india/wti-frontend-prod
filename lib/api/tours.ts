import { cacheLife, cacheTag } from 'next/cache';
import { endPoints } from '@/constants/endpoints';
import { CityItem, ThemeItem } from '@/types/comman';

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
      console.log(`Failed to fetch similar tours:, ${slug} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar tours:', error);
    throw error;
  }
}

export async function getTourCities() {
  'use cache';
  cacheTag('tours-cities');
  cacheLife('hours');

  try {
    const url = endPoints.tour.getCities;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }

    const data = await response.json();

    let cities = [];
    if (data?.payload?.cities) {
      cities = data.payload.cities;
    } else if (data?.payload && Array.isArray(data.payload)) {
      cities = data.payload;
    } else if (data?.cities) {
      cities = data.cities;
    } else if (Array.isArray(data)) {
      cities = data;
    }

    return cities.map((city: CityItem) => ({
      id: city.id || city.slug,
      label: city.label || city.name,
      name: city.name,
      slug: city.slug,
      state_id: city.state_id || null,
      country_id: city.country_id || null,
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export async function getTourThemes() {
  'use cache';
  cacheTag('tours-themes');
  cacheLife('hours');

  try {
    const url = endPoints.tour.getThemes;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch themes: ${response.statusText}`);
    }

    const data = await response.json();

    let themes = [];
    if (data?.payload?.themes) {
      themes = data.payload.themes;
    } else if (data?.payload && Array.isArray(data.payload)) {
      themes = data.payload;
    } else if (data?.themes) {
      themes = data.themes;
    } else if (Array.isArray(data)) {
      themes = data;
    }

    return themes.map((theme: ThemeItem) => ({
      id: theme.id || theme.slug,
      label: theme.label || theme.name,
      name: theme.name,
      slug: theme.slug,
    }));
  } catch (error) {
    console.error('Error fetching themes:', error);
    return [];
  }
}

export async function searchTours(params: {
  cityId?: string;
  themeId?: string;
  page: number;
  limit?: number;
}) {
  'use cache';
  cacheTag('tours', `search-${JSON.stringify(params)}`);
  cacheLife('hours');

  try {
    const queryParams = new URLSearchParams();

    if (params.cityId) queryParams.append('cityId', params.cityId);
    if (params.themeId) queryParams.append('themeId', params.themeId);
    queryParams.append('page', (params.page || 1).toString());
    queryParams.append('limit', (params.limit || 9).toString());

    const url = `${endPoints.tour.search}?${queryParams.toString()}`;

    console.log('Fetching tours from:', url);

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Failed to search tours: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error searching tours:', error);
    return {
      payload: {
        tours: [],
        pagination: {
          page: params.page || 1,
          totalPages: 1,
          total: 0,
        },
      },
    };
  }
}

// Tour FAQSchema
export async function getTourFAQSchema(tourId: string) {
  
  'use cache';
  cacheTag('tours', `faq-schema-${tourId}`);
  cacheLife('hours');

  const url = endPoints.tour.faq.getSchema(tourId);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 3600,
        tags: [`faq-${tourId}`],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No FAQ schema found for tour: ${tourId}`);
        return null;
      }
      throw new Error(`Failed to fetch FAQ schema: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FAQ schema:', error);
    return null;
  }
}
