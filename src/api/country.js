import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const countryApi = {
  list: async (pageSize) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.COUNTRY.list, {
        params: { pageSize },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room fetch failed" };
    }
  },

};