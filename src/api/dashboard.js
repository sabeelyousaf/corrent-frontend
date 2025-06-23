import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const dashboardApi = {
  ANALYTICS: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ANALYTICS.dashboard);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room fetch failed" };
    }
  },

};