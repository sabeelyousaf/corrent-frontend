// api/propertyApi.js
import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const propertyApi = {
  // Create new property
  create: async (payload) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.PROPERTY.create,
        payload 
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property creation failed" };
    }
  },

  // Update existing property
  update: async (id, payload) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(
        ENDPOINTS.PROPERTY.update(id), 
        payload,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          // withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property update failed" };
    }
  },

  // Delete property
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.PROPERTY.delete(id)
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property deletion failed" };
    }
  },

  // Existing functions below (unchanged)
  list: async (filters = {}) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PROPERTY.list, {
        params: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 10,
          propertyId: filters.propertyId,
          propertyTitle: filters.propertyTitle,
          size: filters.size,
          min: filters.min,
          max: filters.max,
          suitableFors: filters.suitableFors,
          propertyType: filters.propertyType,
          country: filters.country,
          amenities: filters.amenities,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property fetch failed" };
    }
  },

  all: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PROPERTY.all);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property fetch failed" };
    }
  },

  get: async (id) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PROPERTY.get(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property fetch failed" };
    }
  },

  removeFav: async (propertyId) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.PROPERTY.removeFav(propertyId)
      );
      return response.data;
    } catch (error) {
      throw error?.response?.data || { 
        message: "Failed to remove from favorites" 
      };
    }
  },

  Scoring: async (id) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PROPERTY.SCORING(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property fetch failed" };
    }
  },

  rating: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PROPERTY.rating);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "property fetch failed" };
    }
  },


};