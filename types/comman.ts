// Fix your type definitions in @/types/common.ts

export interface User {
  name: string;
  email: string;
  phone: string;
  isPhoneVerified: boolean;
}

export interface Tour {
  id: string;
  title: string;
  url: string;
  overview: string;
  description: string;
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  minGroupSize: number;
  maxGroupSize: number;
  best_time: string | null;
  ideal_for: string | null;
  rating: number;
  isActive: boolean;
  cancellationPolicy: string | null;

  themes: ThemeItem[];
  cities: CityItem[];
  startCity: CityItem | null;

  itinerary: ItineraryItem[];
  inclusions: TitleDescription[];
  exclusions: TitleDescription[];
  highlights: string[];
  travel_tips: string;
  price_guide: PriceGuideItem[];
  imageUrls: string[];

  faq: FaqData | null;
  faqSchema: FaqSchema | null;
}

export interface ThemeItem {
  id: string;
  name: string;
  label: string;
  slug: string;
}

export interface CityItem {
  id: string;
  name: string;
  label: string;
  slug: string;
}

export interface PlanOfAction {
  title: string;
  description: string;
  image_url?: string | null;
}

// FIXED: Changed plan_of_action from single object to array
export interface ItineraryItem {
  day: number;
  plan_of_action: PlanOfAction; // Single object from API
}

// FIXED: This should match what you actually use in components
export interface ItineraryDay {
  day: number;
  plan_of_action: PlanOfAction; // Single object for rendering
}

export interface TitleDescription {
  title: string;
  description: string;
}

export interface PriceGuideItem {
  title: string;
  value: number;
}

export interface FaqData {
  id: string;
  tourId: string;
  tourName: string;
  schemaContext: string;
  schemaType: string;
  isActive: boolean;
  faqs: FaqQuestion[];
}

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqSchema {
  '@context': string;
  '@type': string;
  mainEntity: FaqSchemaItem[];
}

export interface FaqSchemaItem {
  '@type': string;
  name: string;
  acceptedAnswer: {
    '@type': string;
    text: string;
  };
}

export interface TourReview {
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images: TourReviewImage[];
  date: string;
  helpful: number;
  isVerified: boolean;
}

export interface TourReviewImage {
  reviewId: string;
  key: string;
  url: string;
  thumbnail: string;
}


// travel-guide

export interface TravelGuideOverview {
  id : string; 
  name : string;
  cityCount : number;
  cities : TravelGuideCity[]
}

export interface TravelGuideCity {
  id : string;
  name : string;
  citySlug : string;
}
export interface TravelGuideCityDetails {
  id: string;
  city: string;
  state: string;
  citySlug: string;
  stateSlug: string;
  introduction: string;
  facts: string;
  foodAndDining: string;
  shopping: string;
  nearbyPlaces: string;
  placesToSeeTop: string;
  placesToSeeBottom: string;
  gettingAround: string;
  otherDetails: string;
  bestTimeToVisit: string;
  cityImage: string;
  isActive: boolean;
}
