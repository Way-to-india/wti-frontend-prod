const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
const USER_PATH = '/user';

export const endPoints = {
  auth: {
    login: `${BASE_URL}${USER_PATH}/auth/login`,
    signup: `${BASE_URL}${USER_PATH}/auth/signup`,
  },

  user: {
    profile: `${BASE_URL}${USER_PATH}/user/profile`,
  },

  tour: {
    id: `${BASE_URL}/tour`,

    reviews: {
      getReview: `${BASE_URL}${USER_PATH}/review/tours/:tourId/reviews`,
    },

    similarTour: `${BASE_URL}/tour/similar-tour/:tourId?limit=${6}`,

    getCities: `${BASE_URL}/city`,

    getThemes: `${BASE_URL}/theme`,

    search: `${BASE_URL}/tour`,

    faq: {

      getSchema :  (tourId : string) => `${BASE_URL}/faq/${tourId}/schema`,

    },
  },

  travelGuide: {
    getAll: `${BASE_URL}/travel-guide/states`,
    getData: `${BASE_URL}/travel-guide/cities/slug/:city`,
  },

  destination: {
    getHomePageData: `${BASE_URL}/places-of-interest/homepage`,
    getCityDestination: (state: string, city: string) =>
      `${BASE_URL}/places-of-interest/states/${state}/cities/${city}/monuments`,
    getMonument: (monument: string) => `${BASE_URL}/places-of-interest/monuments/${monument}`,
  },

  hotelQuery: {
    create: `${BASE_URL}${USER_PATH}/hotel-query`,
  },

  transportQuery: {
    create: `${BASE_URL}${USER_PATH}/transport-query`,
  },

  contactUsQuery: {
    create: `${BASE_URL}${USER_PATH}/contact-us-query`,
  },

  tourQuery: {
    create: `${BASE_URL}${USER_PATH}/tour-query`,
  },
};
