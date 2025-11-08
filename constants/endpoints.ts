const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;
const USER_PATH = '/user';

export const endPoints = {
  auth: {
    login: `${BASE_URL}${USER_PATH}/auth/login`,
    signup: `${BASE_URL}${USER_PATH}/auth/signup`,
  },

  user: {
    profile: `${BASE_URL}${USER_PATH}/profile`,
  },

  tour: {
    id: `${BASE_URL}/tour`,
    reviews: {
      getReview: `${BASE_URL}${USER_PATH}/review/tours/:tourId/reviews`,
    },
    similarTour: `${BASE_URL}/tour/similar-tour/:tourId?limit=${6}`,
  },
  travelGuide: {
    getAll: `${BASE_URL}/travel-guide/states`,
    getData: `${BASE_URL}/travel-guide/cities/slug/:city`,
  },
};
