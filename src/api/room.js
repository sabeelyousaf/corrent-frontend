// api/roomApi.js
import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const roomApi = {

  list: async (filters = {}) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ROOM.list, {
        params: {
          page: filters.page || 1,
          pageSize: filters.pageSize || 10,
          propertyId: filters.propertyId,
          roomTitle: filters.roomTitle,
          size: filters.size,
          min: filters.min,
          max: filters.max,
          suitableFors: filters.suitableFors,
          roomType: filters.roomType,
          country: filters.country,
          amenities: filters.amenities,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room fetch failed" };
    }
  },

  // Get room by ID
  get: async (id) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ROOM.get(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room fetch failed" };
    }
  },

  // Check booking availability
  check_booking: async (id) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ROOM.check_booking(id));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room fetch failed" };
    }
  },

  // Get similar rooms by slug
  similar: async (slug) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ROOM.similar(slug));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "similar rooms fetch failed" };
    }
  },

  // Get favorite rooms
  favorites: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ROOM.favorites);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "favorites fetch failed" };
    }
  },

  // Add room to favorites
  addToFav: async (roomId) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.ROOM.addToFav(roomId));
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "Failed to add to favorites" };
    }
  },

  removeFav: async (roomId) => {
    try {
      const response = await axiosInstance.delete(ENDPOINTS.ROOM.removeFav(roomId));
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "Failed to remove from favorites" };
    }
  },

  create: async (payload) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.ROOM.create, 
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room creation failed" };
    }
  },

  // Update existing property
  update: async (id, payload) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.ROOM.update(id), 
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room update failed" };
    }
  },

  // Delete property
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(
        ENDPOINTS.ROOM.delete(id)
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "room deletion failed" };
    }
  },


  
};
