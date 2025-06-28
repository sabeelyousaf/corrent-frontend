const BASEURL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
 ROOM: {
    list: `${BASEURL}/room`,
    get: (id) => `${BASEURL}/room/${id}`,
    check_booking: (id) => `${BASEURL}/booking/checkDates/${id}`,
    similar: (slug) => `${BASEURL}/room/similar/${slug}`,
    favorites: `${BASEURL}/favorites`,
    addToFav: (id) => `${BASEURL}/add/${id}`,
    removeFav: (id) => `${BASEURL}/remove/${id}`,
    delete: (id) => `${BASEURL}/room/${id}`,
    update: (id) => `${BASEURL}/room/${id}`,
    create: `${BASEURL}/room`,
  },
  COUNTRY: {
    list: `${BASEURL}/country`,
  },
  USER: {
    update: `${BASEURL}/update`,
    bookings: `${BASEURL}/my-bookings`,
    uploadImage:`${BASEURL}/profile/image`,
    verifyOTP:`${BASEURL}/verify-otp`,
    resendOTP:`${BASEURL}/resend-otp`,
    // resendOTP:`${BASEURL}/resend-otp`,
    forgotpassword:`${BASEURL}/forgot-password`,
    resetPassword:`${BASEURL}/reset-password`,
    earning:`${BASEURL}/earnings`,
    tenure:`${BASEURL}/tenure/stat`,
  },
  BOOKING:{
  CREATE: (roomId) => `${BASEURL}/booking/${roomId}`,
  },
  SETTING: {
    update: `${BASEURL}/setting/update`,
  },
  ANALYTICS: {
    dashboard: `${BASEURL}/dashboard/analytics`,
  },
  PROPERTY: {
    list: `${BASEURL}/property`,
    all: `${BASEURL}/property/all`,
    get: (id) => `${BASEURL}/property/${id}`,
    delete: (id) => `${BASEURL}/property/${id}`,
    update: (id) => `${BASEURL}/property/${id}`,
    create: `${BASEURL}/property`,
    SCORING: (id) => `${BASEURL}/${id}/score `,
    rating: `${BASEURL}/property/rating/list`,

  }
};
