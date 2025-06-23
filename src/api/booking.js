// api/propertyApi.js
import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const bookingApi = {
  // Create new property
  create: async (payload,id) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.BOOKING.CREATE(id), 
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property creation failed" };
    }
  },
}